<!-- 首页-网址导航-经常访问的网站 -->
<template>
  <HomeWebsiteGroup
    :data="dataGroup"
    :editable="true"
    @edit="openDialog('编辑', $event)"
    @remove="openDialog('删除', $event)"
  />
  <!-- 操作弹窗 -->
  <MxDialog
    v-if="dialogType"
    v-model="dialogType"
    :title="`${dialogType}网址`"
  >
    <!-- 删除 -->
    <div v-if="dialogType === '删除'">你确定要删除这条网址?</div>
    <!-- 添加/编辑 -->
    <template v-else>
    <MxFormItem
      v-model="dialogData.title"
      label="标题："
    />
    <MxFormItem
      v-model="dialogData.url"
      label="网址："
    />
    </template>
    <div class="mx-hwebsite-hint">注意：{{ dialogType }}网址只会修改起始页内容，不会改变浏览器内其他应用和已有收藏夹的内容</div>
    <template #footer>
      <MxBtn
        :disabled="submidDiasbled"
        @click="dialogCb"
      >
        确定
      </MxBtn>
      <MxBtn
        type="info"
        @click="closeDialog"
      >
        取消
      </MxBtn>
    </template>
  </MxDialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useStorage } from '@vueuse/core';

import HomeWebsiteGroup from './HomeWebsiteGroup.vue';
import defaultDataList from '@/data/home-websites-fav.js';
import api from '@/api';

// 是否已登录
const cookies = useCookies();
const isLogin = !!cookies.get('MXTOKEN');

// 提交请求
const submitLoading = ref(false);
const submidDiasbled = computed(() => {
  return submitLoading.value || !dialogData.value.title || !dialogData.value.url;
});
async function sendRequest(type, params = {}) {
  submitLoading.value = true;
  const { data } = await api.getHomeFavSites(type, params);
  submitLoading.value = false;
  if (data.error_code) {
    alert(data.message);
    return { code: 1, data: null };
  } else {
    closeDialog();
    return { code: 0, data };
  }
}

// 获取列表
const dataList = ref([]);
async function getFavList() {
  if (isLogin) {
    const { data } = await sendRequest('get');
    dataList.value = data;
  } else {
    dataList.value = useStorage('home-website-fav', defaultDataList).value;
  }
}
getFavList();

// 获取分组
const dataGroup = computed(() => {
  const groupList = [];
  let groupIndex = -1;
  dataList.value?.forEach((item, index) => {
    if (index % 24 === 0) {
      groupIndex += 1;
      groupList.push({ groupName: groupIndex, children: [] });
    }
    item.index = index;
    item.iconSet = getFavIcon(item);
    groupList[groupIndex].children.push(item);
  });
  return groupList;
});

// 获取图标
function getFavIcon(item) {
  const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
  if (reg.test(item.url)) {
    const url = new URL(item.url);
    return `${url.origin}/favicon.ico`;
  } else {
    return './images/home-websites-fav/default.png';
  }
}

// 弹窗
const dialogType = ref(false);
const dialogData = ref({});
const dialogCb = ref(null);

// 打开弹窗
function openDialog(type, item = { title: '', url: '' }) {
  dialogType.value = type;
  dialogData.value = JSON.parse(JSON.stringify(item));
  dialogCb.value = type === '编辑' ? editFav : type === '删除' ? delFav : addFav;
}
defineExpose({ openDialog });

// 关闭弹窗
function closeDialog() {
  dialogType.value = false;
}

// 添加
async function addFav() {
  if (isLogin) {
    const res = await sendRequest('add', dialogData.value);
    if (res.code) return;
  }
  dataList.value.push(dialogData.value);
  closeDialog();
}

// 编辑
async function editFav() {
  const { index, title, url } = dialogData.value;
  if (isLogin) {
    const res = await sendRequest('edit', { index, title, url });
    if (res.code) return;
  }
  dataList.value.splice(index, 1, dialogData.value);
  closeDialog();
}

// 删除
async function delFav() {
  const { index } = dialogData.value;
  if (isLogin) {
    const res = await sendRequest('del', { index });
    if (res.code) return;
  }
  dataList.value.splice(index, 1);
  closeDialog();
}

<style lang="scss">
.mx-hwebsite-hint {
  margin-top: 10px;
  font-size: 12px;
  color: #878787;
}
</style>
