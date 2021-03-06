<template>
  <div class="product-list">
    <!-- 搜索部分 -->
    <search @submit="searchSubmit" :data="categoryList" />
    <!-- 表格显示部分 -->
    <!-- 绑定data对应:data-source="tableData" -->
    <!-- categoryList映射到productTable -->
    <product-list
      :data="tableData"
      :page="page"
      @change="changePage"
      :categoryList="categoryList"
    >
    </product-list>
  </div>
</template>

<script>
import Search from '@/components/search.vue';
import ProductList from '@/components/productTable.vue';
import api from '@/api/product';
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      categoryList: [],
      tableData: [],
      // 搜索值
      searchForm: {},
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },
  components: {
    Search,
    ProductList,
  },
  // 获取数据的先后 【先获取类目 在获取表格数据】
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
    },
    getTableData() {
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          console.log(res);
          this.page.total = res.total;
          // 从api成功获得 数据传给表格 数组形式
          this.tableData = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category].name,
          }));
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
  },
};
</script>
