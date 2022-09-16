import {WelcomeFooterLayout} from '../WelcomeFooterLayout';
import {RouterLink} from 'vue-router';
import s from '../../../stylesheets/Welcome/WelcomeFooterLayout.module.scss';

export const SecondAction = () => {
  return (
    <WelcomeFooterLayout>
      {{
        buttons: () =>
          <>
            <RouterLink class={s.fake} to="/start">跳过</RouterLink>
            <RouterLink class={s.next} to="/welcome/3">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
      }}
    </WelcomeFooterLayout>
  );
};

SecondAction.displayName = 'SecondAction';