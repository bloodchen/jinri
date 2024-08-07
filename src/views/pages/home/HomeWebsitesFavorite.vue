<!-- 首页-经常访问的网站 -->
<template>
  <HomeWebsitesGroup
    :data="dataList"
    :editable="true"
    cols="4"
    @edit="openDialog('编辑', $event)"
    @remove="openDialog('删除', $event)"
    @sort="sortSite"
    @img-error="onImgError"
  />
  <!-- 操作弹窗 -->
  <MxDialog
    v-if="dialogType"
    :title="`${dialogType}网址`"
    @click="closeDialog"
  >
    <!-- 删除 -->
    <div v-if="dialogType === '删除'">你确定要删除这条网址？</div>
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
        :disabled="!dialogData.title || !dialogData.url"
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
import { ref } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useStorage } from '@vueuse/core';
import { getGuid } from '@/utiles';

import HomeWebsitesGroup from './HomeWebsitesGroup.vue';
import defaultDataList from '@/data/home-favorite-websites.js';
import api from '@/api';

// 是否已登录
const cookies = useCookies();
const isLogin = !!cookies.get('MXTOKEN');

// 初始化数据
const isInit = useStorage('home-website-favorite-init', false);
const dataList = useStorage('home-website-favorite', []);
(async function() {
  // 是否已初始化
  if (isInit.value) return;
  // 是否已登录
  if (isLogin) {
    const data = await api.getHomeFavoriteSites('get');
    dataList.value = formatDataList(data || defaultDataList);
  } else {
    dataList.value = formatDataList(defaultDataList);
  }
  // 初始化完成
  isInit.value = true;
  closeDialog();
})();

// 格式化数据
function formatDataList(list) {
  if (!list) return [];
  return list.map(item => formatDataItem(item));
}
function formatDataItem(item) {
  const newUrl = item.url.replace('http://', 'https://');
  const urlObj = new URL(newUrl);
  return {
    ...item,
    id: item.id || getGuid(),
    url: newUrl,
    iconSet: `${urlObj.origin}/favicon.ico`
  };
}

// 弹窗
const dialogType = ref(false);
const dialogData = ref({});
const dialogCb = ref(null);

// 打开弹窗
function openDialog(type, item) {
  dialogType.value = type;
  dialogData.value = JSON.parse(JSON.stringify(item));
  dialogCb.value = type === '编辑' ? editSite : type === '删除' ? delSite : addSiteSubmit;
}

// 关闭弹窗
function closeDialog() {
  dialogType.value = false;
}

// 校验网址
function checkUrl(url) {
  // eslint-disable-next-line no-useless-escape
  const reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  const isSuccess = reg.test(url);
  if (!isSuccess) {
    alert('网址格式错误！');
  }
  return isSuccess;
}

// 添加
function addSite() {
  if (dataList.value.length >= 36) {
    alert('自定义网址数量已达到最大数量，无法继续添加！');
    return;
  }
  openDialog('添加', { title: '', url: 'https://' });
}

// 添加提交
async function addSiteSubmit() {
  const { title, url } = dialogData.value;
  const isSuccess = checkUrl(url);
  if (!isSuccess) return;
  const newItem = formatDataItem({ title, url });
  dataList.value.push(newItem);
  closeDialog();
  if (isLogin) {
    api.getHomeFavoriteSites('add', { title, url });
  }
}

// 编辑
async function editSite() {
  const { sortIndex, id, title, url } = dialogData.value;
  const isSuccess = checkUrl(url);
  if (!isSuccess) return;
  const newItem = formatDataItem({ id, title, url });
  dataList.value.splice(sortIndex, 1, newItem);
  closeDialog();
  if (isLogin) {
    api.getHomeFavoriteSites('edit', { index: sortIndex, title, url });
  }
}

// 删除
async function delSite() {
  const { sortIndex } = dialogData.value;
  dataList.value.splice(sortIndex, 1);
  closeDialog();
  if (isLogin) {
    api.getHomeFavoriteSites('del', { index: sortIndex });
  }
}

// 排序
function sortSite({ dragItem, dragIndex, targetIndex }) {
  dataList.value.splice(dragIndex, 1);
  dataList.value.splice(targetIndex, 0, dragItem);
  if (isLogin) {
    api.getHomeFavoriteSites('swap', { aIndex: dragIndex, bIndex: targetIndex });
  }
}

// 恢复默认
function resetSite() {
  dataList.value = formatDataList(defaultDataList);
  if (isLogin) {
    api.getHomeFavoriteSites('reset');
  }
}

// 图片错误
function onImgError(item) {
  item.icon = '/images/home-websites/default.png';
  dataList.value.splice(item.sortIndex, 1, item);
}

defineExpose({ addSite, resetSite });
</script>

<style lang="scss">
.mx-hwebsite-hint {
  margin-top: 10px;
  font-size: 12px;
  color: #878787;
}
</style>
