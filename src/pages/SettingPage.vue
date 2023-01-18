<script setup lang="ts">
import { useGlobalStore } from '@/store'
import { useRouter } from 'vue-router'
import { showFailToast, showToast, type } from 'vant'
import { exportDBToFile, importDBFromFile } from '@/db'

const router = useRouter()
const globalStore = useGlobalStore()

const onChangeTheme = (val: boolean) => {
  globalStore.changeTheme(val)
}

const exportDatabase = async () => {
  try {
    exportDBToFile()
  } catch (error) {
    showFailToast(`${error}`)
  }
}

const beforeRead = (file: File) => {
  if (file.type !== 'application/json') {
    showToast('请上传 json 格式文件')
    return false
  }
  return true
}

const importDatabase = async (file: UploaderFileListItem) => {
  console.log(file)
  try {
    if (file.file) {
      await importDBFromFile(file.file)
    }
  } catch (error) {
    showFailToast(`${error}`)
    throw error
  }
}
</script>

<template>
  <van-nav-bar
    safe-area-inset-top
    fixed
    title="设置"
    left-arrow
    @click-left="() => router.go(-1)"
  />

  <van-cell-group class="wrapper-style">
    <van-cell title="暗夜主题" center>
      <template #right-icon>
        <van-switch v-model="globalStore.darkTheme" size="22px" @change="onChangeTheme" />
      </template>
    </van-cell>
    <van-cell title="导出数据" center>
      <template #right-icon>
        <van-button type="primary" size="small" @click="exportDatabase">导出数据</van-button>
      </template>
    </van-cell>
    <van-cell title="导入数据" center>
      <template #right-icon>
        <van-uploader :before-read="beforeRead" :after-read="importDatabase" accept=".json">
          <van-button type="primary" size="small">导入数据</van-button>
        </van-uploader>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<style scoped>
.wrapper-style {
  padding-top: var(--van-nav-bar-height);
}
</style>
