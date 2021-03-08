<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-detail
        v-if="current === 0"
        @next="next"
        :form="form"
      ></basic-detail>
      <sale-detail
        v-else-if="current === 1"
        @next="next"
        @prev="prev"
        :form="form"
      ></sale-detail>
    </div>
  </div>
</template>

<script>
import BasicDetail from '@/components/basicDetail.vue';
import SaleDetail from '@/components/saleDetail.vue';
import productApi from '@/api/product';

export default {
  components: {
    BasicDetail,
    SaleDetail,
  },
  data() {
    return {
      current: 0,
      form: {
        title: '',
        desc: '',
        category: '',
        c_item: '',
        tags: '',
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: '',
        images: [],
      },
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  created() {
    // 判断是否为编辑界面，url中有无id值
    const { id } = this.$route.params;
    console.log(id);
    if (id) {
      productApi.detail(id).then((res) => {
        this.form = res;
        console.log(res);
      });
    }
    console.log(this.form);
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form,
      };
      // 区分编辑与新增
      if (this.current === 1) {
        if (this.$route.params.id) {
          productApi.edit(this.form).then((res) => {
            console.log(res);
            this.$message.success('Edit Success');
            this.$router.push({ name: 'ProductList' });
          });
        } else {
          productApi.add(this.form).then((res) => {
            console.log(res);
            this.$message.success('Add Success');
            this.$router.push({ name: 'ProductList' });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style lang="less" scoped>
.product-detail {
  .product-steps {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
}
</style>
