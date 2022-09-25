import {defineComponent, onMounted, PropType, ref} from 'vue';
import s from '../stylesheets/sharedStyle/Overlay.module.scss';
import {Icon} from './Icon';
import {RouterLink, useRoute, useRouter} from 'vue-router';
import {User} from '../env';
import {Dialog} from 'vant';
import {useMeStore} from '../stores/useMeStore';

export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const meStore = useMeStore();
    const close = () => {
      props.onClose?.();
    };
    const me = ref<User>();
    onMounted(async () => {
      const response = await meStore.mePromise;
      me.value = response?.data.resource;
    });
    const onSignOut = async () => {
      await Dialog.confirm({
        title: '确认',
        message: '你真的要退出登录吗？',
      });
      localStorage.removeItem('jwt');
      router.push('/sign_in');
    };
    const route = useRoute();
    const router = useRouter();
    return () => <>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay}>
        <section class={s.overlay_header}>
          {me.value ?
            <div>
              <h2 class={s.email}>{me.value.email.slice(0, me.value.email.indexOf('@'))}</h2>
              <p onClick={onSignOut}>点击注销</p>
            </div> :
            <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
              <h2>未登录用户</h2>
              <p>点击登录</p>
            </RouterLink>}
        </section>
        <nav class={s.overlay_main}>
          <ul class={s.action_list}>
            <li>
              <RouterLink to="/items" class={s.action}>
                <Icon name="index" class={s.icon}/>
                <span>记账</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/statistics" class={s.action}>
                <Icon name="charts" class={s.icon}/>
                <span>统计图表</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/export" class={s.action}>
                <Icon name="export" class={s.icon}/>
                <span>导出数据</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/notify" class={s.action}>
                <Icon name="time" class={s.icon}/>
                <span>记账提醒</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </>;
  }
});

export const OverlayIcon = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false);
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value;
    };
    return () => <>
      <Icon name="menu" class={s.navIcon} onClick={onClickMenu}/>
      {
        refOverlayVisible.value &&
        <Overlay onClose={() => refOverlayVisible.value = false}/>
      }
    </>;
  }
});
