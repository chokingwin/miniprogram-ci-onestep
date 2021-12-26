const ci = require('miniprogram-ci');
const kuler = require('kuler');

const uploadSucFiles = [];
let haveError = false;

const cb = output => {
    if (haveError) return;

    if (!!output.code) {
        haveError = true;
        console.log(output);
        console.log(kuler('something wrong is happened.pleace check.', '#ff4d4f'));
        return;
    }

    const allowSuffixs = ['js', 'json', 'wxml', 'wxss', 'ts', 'less', 'sass'];
    const curSuffix = output._msg.slice(output._msg.lastIndexOf('.') + 1);

    // 按后缀筛选 _msg
    if (
        allowSuffixs.indexOf(curSuffix) >= 0
        &&
        output._status === 'done'
    ) {
        uploadSucFiles.push(`${output._msg} ${kuler('is uploaded.', '#2da44e')}`);
        // clear terminal output
        console.clear();
        console.log(uploadSucFiles.join('\n'));
    }
};

; (async () => {
    try {
        const project = new ci.Project({
            appid: 'wx202120212021',
            type: 'miniProgram',
            projectPath: './wx202120212021',
            privateKeyPath: './private.wx202120212021.key',
            ignores: ['node_modules/**/*'],
        })
        const uploadResult = await ci.upload({
            project,
            version: '版本号',
            desc: '项目备注',
            setting: {
                es6: true,
            },
            onProgressUpdate: cb,
        })
        // console.log('uploadResult:', uploadResult);
        console.log('\n');
        console.log(`${kuler('upload success~', '#ff5722')} 🎉🥳`);
    } catch (error) {
        cb(error);
    }
})()