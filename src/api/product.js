import axios from '@/axios';

export default {
  list(params) {
    return axios.get('/products/all', { params });
  },
  remove(params) {
    return axios.delete(`/products/${params.id}`);
  },
  add(params) {
    return axios.post('/products/add', params);
  },
  // 查看商品对应id的商品信息
  detail(id) {
    // return axios.get(`/products${id}`);
    return axios.get(`/products/${id}`);
  },
  edit(params) {
    return axios.put('/products/edit', params);
  },
};
