<!-- 首页-网址导航-经常访问的网站 -->
<template>
  <HomeWebsiteGroup
    :data="dataGroup"
    :editable="true"
    @edit="openDialog('编辑', $event)"
    @remove="openDialog('删除', $event)"
    @sort="sortFav"
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
      <MxBtn @click="dialogCb"> 确定 </MxBtn>
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

// 添加id
const formatDataList = defaultDataList.map((item, index) => {
  return { ...item, id: index };
});

// 是否已登录
const cookies = useCookies();
const isLogin = !!cookies.get('MXTOKEN');

// 获取列表
const isInit = useStorage('home-website-init', false);
const dataList = useStorage('home-website-fav', []);
async function getFavList() {
  // 是否已初始化
  if (isInit.value) return;
  // 是否已登录
  if (isLogin) {
    const { data } = await api.getHomeFavSites('get');
    dataList.value = data || formatDataList;
  } else {
    dataList.value = formatDataList;
  }
  // 初始化完成
  isInit.value = true;
  closeDialog();
}
getFavList();

// 获取分组
const dataGroup = computed(() => {
  let groupIndex = -1;
  const groupList = [];
  dataList.value?.forEach((item, index) => {
    if (index % 18 === 0) {
      groupIndex += 1;
      groupList.push({ groupName: groupIndex, children: [] });
    }
    item.sortIndex = index;
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

// 关闭弹窗
function closeDialog() {
  dialogType.value = false;
}

// 添加
async function addFav() {
  const { title, url } = dialogData.value;
  if (isLogin) {
    api.getHomeFavSites('add', { title, url });
  }
  dataList.value.push(dialogData.value);
  closeDialog();
}

// 编辑
async function editFav() {
  const { sortIndex, title, url } = dialogData.value;
  if (isLogin) {
    api.getHomeFavSites('edit', { index: sortIndex, title, url });
  }
  dataList.value.splice(sortIndex, 1, dialogData.value);
  closeDialog();
}

// 删除
async function delFav() {
  const { sortIndex } = dialogData.value;
  if (isLogin) {
    api.getHomeFavSites('del', { index: sortIndex });
  }
  dataList.value.splice(sortIndex, 1);
  closeDialog();
}

// 重置
function resetFav() {
  if (isLogin) {
    api.getHomeFavSites('reset');
  }
  dataList.value = formatDataList;
}

// 调整位置
function sortFav({ dragItem, dragIndex, targetIndex }) {
  if (isLogin) {
    api.getHomeFavSites('swap', { aIndex: dragIndex, bIndex: targetIndex });
  }
  dataList.value.splice(dragIndex, 1);
  dataList.value.splice(targetIndex, 0, dragItem);
}

defineExpose({ openDialog, resetFav });
</script>

<style lang="scss">
.mx-hwebsite-hint {
  margin-top: 10px;
  font-size: 12px;
  color: #878787;
}
</style>
