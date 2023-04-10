branch=$1

type=$2

imageName="fx-nx"

asdf install

yarn

echo "  --> 开始执行 yarn build..."

if [ $branch == "dev" ];then
  # yarn build:$type
  yarn nx build $type
  imageName="fx-nx-dev"
else
  echo "  --> "$branch"不构建..."
  exit 1
fi

# if [ $branch == "release" ];then
#   yarn build:test
#   imageName="fx-nx-test"
# elif [ $branch == "uat" ];then
#   yarn build:uat
#   imageName="fx-nx-uat"
# elif [ $branch == "master" ];then
#   yarn build:prod
#   imageName="fx-nx-prod"
# elif [ $branch == "develop" ];then
#   yarn build:develop
#   imageName="fx-nx-dev"
# else
#   echo "  --> "$branch"不构建..."
#   exit 1
# fi

if [ $? -ne 0 ];then
  echo "  --> yarn build 失败..."
  exit 1
fi

echo "   --> 开始编译docker镜像..."

version=$(jenkins-build-tools gen -p $imageName | awk 'END {print$1}')
version_number=harbor.flyele.vip/develop/$imageName:$version


if [ $type == "h5" ];then
  docker build --platform linux/amd64 -t $version_number -f deployment/Dockerfile .
elif [ $type == "official-website" ];then
  docker build --platform linux/amd64 -t $version_number -f deployment/DockerfileWeb .
elif [ $type == "management-system" ];then
  docker build --platform linux/amd64 -t $version_number -f deployment/DockerfileManage .
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
