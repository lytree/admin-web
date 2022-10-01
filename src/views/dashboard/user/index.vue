<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="pb-3">
      <n-card size="huge"
        ><div class="mb-6 text-center">
          <n-tooltip placement="right" trigger="hover">
            <template #trigger>
              <n-avatar round :size="104" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
            </template>
            点击可修改头像
          </n-tooltip>
          <div class="mt-4 mb-1 text-xl font-medium leading-5" style="color: rgba(0, 0, 0, 0.85)"></div>
          <div></div>
        </div>
        <div>
          <p class="mb-3"><ph-link-simple-duotone></ph-link-simple-duotone></p>
          <p class="mb-3"><ic-round-email></ic-round-email></p>
          <p class="mb-3"><ic-round-calendar-today></ic-round-calendar-today></p>
        </div>
        <n-divider />
        <n-list>
          <n-list-item>
            <n-thing title="Thing">
              Biu<br />
              Biu<br />
              Biu<br />
            </n-thing>
          </n-list-item>
          <n-list-item>
            <n-thing title="Thing" />
          </n-list-item>
        </n-list>
      </n-card>
    </div>
    <div class="pb-3">
      <n-card title="个人资料" size="small">
        <n-tabs type="line" animated>
          <n-tab-pane name="userinfo" tab="基本资料"
            ><n-form class="w-[512px]">
              <n-form-item label="用户名：" path="username">
                <n-input v-model:value="userinfo.username" disabled /> </n-form-item
              ><n-form-item label="昵称：" path="nickname">
                <n-input v-model:value="userinfo.nickname" placeholder="Input" /> </n-form-item
              ><n-form-item label="电子邮箱：" path="userEmail">
                <n-input v-model:value="userinfo.userEmail" placeholder="Input" /> </n-form-item
              ><n-form-item label="个人说明：" path="userProfiles">
                <n-input v-model:value="userinfo.userProfiles" type="textarea" placeholder="Input" />
              </n-form-item>
            </n-form>
            <div style="display: flex; justify-content: flex-start">
              <n-button round type="primary" @click="updateUserInfo"> 保存 </n-button>
            </div>
          </n-tab-pane>
          <n-tab-pane name="password" tab="密码"
            ><n-form class="w-[512px]">
              <n-form-item label="旧密码：" path="inputValue">
                <n-input
                  v-model:value="userpassword.oldPassword"
                  type="password"
                  show-password-on="mousedown"
                  placeholder="Input"
                /> </n-form-item
              ><n-form-item label="新密码：" path="inputValue">
                <n-input
                  v-model:value="userpassword.newPassword"
                  type="password"
                  show-password-on="mousedown"
                  placeholder="Input"
                /> </n-form-item
              ><n-form-item label="确认密码：" path="inputValue">
                <n-input
                  v-model:value="userpassword.nextNewPassword"
                  type="password"
                  show-password-on="mousedown"
                  placeholder="Input"
                />
              </n-form-item>
            </n-form>
            <div style="display: flex; justify-content: flex-start">
              <n-button round type="primary" @click="updatePasswords"> 更新密码 </n-button>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchUserInfo, updateUser, updatePassword } from '@/service/api/auth';
import PhLinkSimpleDuotone from '~icons/ph/link-simple-duotone';
import IcRoundEmail from '~icons/ic/round-email';
import IcRoundCalendarToday from '~icons/ic/round-calendar-today';
import { useMessage } from 'naive-ui';
const message = useMessage();
const userinfo = ref<ApiAuth.UserInfo>({ id: '', username: '', token: '' });
const userpassword = ref<{
  oldPassword: string;
  newPassword: string;
  nextNewPassword: string;
}>({
  oldPassword: '',
  newPassword: '',
  nextNewPassword: ''
});

function updateUserInfo() {
  updateUser(userinfo.value).then(req => {
    if (!req.error) {
      message.info('修改成功');
    } else {
      message.error(req.error.message);
    }
  });
}
function updatePasswords() {
  if (userpassword.value.newPassword === userpassword.value.nextNewPassword) {
    updatePassword(userpassword.value).then(req => {
      if (!req.error) {
        message.info('修改成功');
      } else {
        message.error(req.error.message);
      }
    });
  } else {
    message.error('两次密码新不一致');
  }
}

onMounted(async () => {
  const { data } = await fetchUserInfo();
  if (data) {
    userinfo.value = data;
  }
  return null;
});
</script>
<style></style>
