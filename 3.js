/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-28 10:33:59
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-28 10:36:01
 * @FilePath: /fx-nx/scripts/publish-cli/lib/3.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const cp = require('child_process')
cp.exec('npm publish', { cwd: `./dist/libs/service-module` }, () => {
    console.log('success')
})