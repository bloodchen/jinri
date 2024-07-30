<!-- 首页-网址导航-经常访问的网站 -->
<template>
  <HomeWebsiteGroup
    :data="dataGroup"
    :editable="true"
    cols="4"
    @edit="openDialog('编辑', $event)"
    @remove="openDialog('删除', $event)"
    @sort="sortSite"
  />
  <!-- 操作弹窗 -->
  <MxDialog
    v-if="dialogType"
    v-model="dialogType"
    :title="`${dialogType}网址`"
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
import { ref, computed } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useStorage } from '@vueuse/core';

import HomeWebsiteGroup from './HomeWebsiteGroup.vue';
import defaultDataList from '@/data/home-websites-favorite.js';
import api from '@/api';

// 是否已登录
const cookies = useCookies();
const isLogin = !!cookies.get('MXTOKEN');

// 获取列表
const isInit = useStorage('home-website-favorite-init', false);
const dataList = useStorage('home-website-favorite', []);
async function getDataList() {
  // 是否已初始化
  if (isInit.value) return;
  // 是否已登录
  if (isLogin) {
    const data = await api.getHomeFavoriteSites('get');
    dataList.value = formatDataList(data) || formatDataList(defaultDataList);
  } else {
    dataList.value = formatDataList(defaultDataList);
  }
  // 初始化完成
  isInit.value = true;
  closeDialog();
}
getDataList();

// 添加id
function formatDataList(list) {
  if (!list) return '';
  return list.map((item, index) => {
    return { ...item, id: index };
  });
}

// 获取分组
const dataGroup = computed(() => {
  let groupIndex = -1;
  const groupList = [];
  dataList.value?.forEach((item, index) => {
    if (index % 12 === 0) {
      groupIndex += 1;
      groupList.push({ groupName: groupIndex, children: [] });
    }
    item.sortIndex = index;
    item.iconSet = getFavicon(item);
    groupList[groupIndex].children.push(item);
  });
  return groupList;
});

// 获取图标
function getFavicon({ url }) {
  const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
  if (reg.test(url)) {
    const urlObj = new URL(url);
    return `${urlObj.origin}/favicon.ico`;
  } else {
    return './images/home-websites-favorite/default.png';
  }
}

// 校验网址
function checkUrl(url) {
  const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
  const res = reg.test(url);
  if (!res) {
    alert('网址格式错误！');
  }
  return res;
}

// 弹窗
const dialogType = ref(false);
const dialogData = ref({});
const dialogCb = ref(null);

// 打开弹窗
function openDialog(type, item = { title: '', url: '' }) {
  dialogType.value = type;
  dialogData.value = JSON.parse(JSON.stringify(item));
  dialogCb.value = type === '编辑' ? editSite : type === '删除' ? delSite : addSite;
}

// 关闭弹窗
function closeDialog() {
  dialogType.value = false;
}

// 添加
async function addSite() {
  const { title, url } = dialogData.value;
  const isSuccess = checkUrl(url);
  if (!isSuccess) return;
  dataList.value.push({ title, url, id: dataList.value.length });
  closeDialog();
  if (isLogin) {
    api.getHomeFavoriteSites('add', { title, url });
  }
}

// 编辑
async function editSite() {
  const { sortIndex, title, url } = dialogData.value;
  const isSuccess = checkUrl(url);
  if (!isSuccess) return;
  dataList.value.splice(sortIndex, 1, dialogData.value);
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

// 重置
function resetSite() {
  dataList.value = formatDataList(defaultDataList);
  if (isLogin) {
    api.getHomeFavoriteSites('reset');
  }
}

// 调整位置
function sortSite({ dragItem, dragIndex, targetIndex }) {
  dataList.value.splice(dragIndex, 1);
  dataList.value.splice(targetIndex, 0, dragItem);
  if (isLogin) {
    api.getHomeFavoriteSites('swap', { aIndex: dragIndex, bIndex: targetIndex });
  }
}

defineExpose({ openDialog, resetSite });
</script>

<style lang="scss">
.mx-hwebsite-hint {
  margin-top: 10px;
  font-size: 12px;
  color: #878787;
}
</style>
