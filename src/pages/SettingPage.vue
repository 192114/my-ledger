<script setup lang="ts">
import { useGlobalStore } from '@/store'
import { useRouter } from 'vue-router'
import { showFailToast, showToast, type UploaderFileListItem } from 'vant'
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

const beforeRead = (file: File | File[]) => {
  if (!Array.isArray(file) && file.type !== 'application/json') {
    showToast('请上传 json 格式文件')
    return false
  }
  return true
}

const importDatabase = async (file: UploaderFileListItem | UploaderFileListItem[]) => {
  if (Array.isArray(file)) {
    return
  }
  try {
    if (file.file) {
      // await db.delete()
      await importDBFromFile(file.file)
      showToast('上传成功')
    }
  } catch (error) {
    showFailToast(`${error}`)
    console.log(error)
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
