<template>
<div class="uploader-wrap" v-loading="loading">
    <input class="file-input" type="file" accept="image/jpg,image/jpeg,image/bmp,,image/png" @change="onChange">
    <div
        class="img-contain"
        :style="{backgroundImage: `url(${value || ''})`}"
    ></div>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {getBosToken} from '@/request/request';
export default {
    props: ['value'],
    data() {
        return {
            fileUrl: '',
            loading: false
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        async onChange(e) {
            this.loading = true;
            await this.upload(e);
            this.loading = false;
        },
        async upload(e) {
            const {files} = e.target;
            if (files.length < 1) {
                return;
            }
            const file = files[0];
            const ext = file.type.replace(/(.*?\/)/, '');
            const {code, msg, data: bosToken} = await getBosToken({ext});
            if (code !== 0) {
                this.$message.error(msg);
            }
            const bosConfig = {
                credentials: {
                    ak: bosToken.AccessKeyId,
                    sk: bosToken.SecretAccessKey
                },
                key: bosToken.key,
                sessionToken: bosToken.SessionToken,
                endpoint: 'https://bj.bcebos.com'
            };
            const client = new baidubce.sdk.BosClient(bosConfig);
            try {
                await client.putObjectFromBlob('jizhang', bosToken.key, file);
                this.$emit('input', `https://jizhang.bj.bcebos.com/${bosToken.key}`);
            }
            catch (e) {
                this.$message.error('图片上传失败~');
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.uploader-wrap,
.img-contain,
.file-input
    width 100%
    height 100%
    top 0
    left 0
.img-contain
    position absolute
    z-index 0
    background-size contain
    background-repeat no-repeat
    background-position center
    background-color #f5f5f5
.file-input
    position absolute
    cursor pointer
    z-index 1
    opacity 0
</style>