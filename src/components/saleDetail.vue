<template>
  <div class="sale-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
      :rules="rules"
    >
      <a-form-model-item label="商品售价" required prop="price">
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="商品折扣价" prop="price_off">
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory">
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <!-- 图片保存在fileList中 -->
        <a-upload
          :action="
            'http://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item class="next-btn" label="" :wrapperCol="{ span: 24 }">
        <a-button @click="prev" type="default">上一步</a-button>
        <a-button @click="next" type="primary">提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      // console.log('change:', file, fileList, event);
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    prev() {
      this.$emit('prev');
    },
  },
  props: ['form'],
  // 判断获取图片地址，并存放到fileList
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  data() {
    return {
      // form: {
      //   price: 0,
      //   price_off: 0,
      //   inventory: 0,
      //   unit: '',
      //   images: [],
      // },
      previewVisible: false,
      previewImage: '',
      rules: {},
      fileList: [],
    };
  },
};
</script>
