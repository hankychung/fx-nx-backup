branch=$1
###
 # @Author: wanghui wanghui@flyele.net
 # @Date: 2023-06-21 09:50:59
 # @LastEditors: wanghui wanghui@flyele.net
 # @LastEditTime: 2023-07-06 15:08:24
 # @FilePath: /fx-nx/self_build.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 

app=$2

imageName="fx-nx"

asdf install

yarn

echo "  --> 修改环境变量 $branch 并 开始执行 yarn build..."

if [ $branch == "dev" ];then
  yarn cross-env NODE_ENV=dev nx build $app
  imageName="fx-nx-"$app"-dev"
elif [ $branch == "release" ];then
  yarn cross-env NODE_ENV=test nx build $app
  imageName="fx-nx-"$app"-test"
elif [ $branch == "master" ];then
  yarn cross-env NODE_ENV=prod nx build $app
  imageName="fx-nx-"$app"-prod"
else
  echo "  --> "$branch"不构建..."
  exit 1
fi

if [ $? -ne 0 ];then
  echo "  --> yarn build 失败..."
  exit 1
fi

echo "   --> 开始编译docker镜像..."

version=$(jenkins-build-tools gen -p $imageName | awk 'END {print$1}')
version_number=harbor.flyele.vip/develop/$imageName:$version


if [ $app == "h5" ];then
  docker build --platform linux/amd64 -t $version_number -f deployment/Dockerfile .
elif [ $app == "official-website" ];then
  docker build --platform linux/amd64 -t $version_number -f deployment/DockerfileWeb .
elif [ $app == "management-system" ];then
  docker build --platform linux/amd64 -t $version_number -f deployment/DockerfileManage .
elif [ $app == "landing" ];then
  docker build --platform linux/amd64 -t $version_number -f deployment/DockerfileLanding .
elif [ $app == "web-client" ];then
docker build --platform linux/amd64 -t $version_number -f deployment/DockerfileWebClient .
else
  echo "  --> 不打镜像..."
  exit 1
fi

if [ $? -ne 0 ];then
  echo "    --> docker build 失败..."
  exit 1
fi
docker push $version_number

docker rmi $version_number

echo "  -> 编译完成！"

# echo -e "\033[1;5;33m 开始推送到opman..."
# commitMessage=$(git log --pretty=format:"%cn(%ce)-%h %s" --graph -n 2)
# r=$(curl -o /dev/null -w %{http_code} -X POST 'http://192.168.1.186:8080/v1/repositories' -H "content-type: multipart/form-data" \
# -F name=$imageName \
# -F platform=docker \
# -F release_note="${commitMessage}" \
# -F version_number=$version_number \
# -F commit_id=$(git rev-parse HEAD) \
# -F channel=1 \
# -F increment=2)
