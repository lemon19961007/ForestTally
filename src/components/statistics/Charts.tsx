import {defineComponent, PropType, ref} from 'vue';
import {FormItem} from '../../shared/Form';
import s from '../../stylesheets/statistics/Charts.module.scss';
import {PieChart} from './PieChart';
import {LineChart} from './LineChart';
import {Bars} from './Bars';

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup: (props, context) => {
    const category = ref('expenses');
    return () => (
      <div class={s.wrapper}>
        <FormItem label="类型" type="select" options={[
          {value: 'expenses', text: '支出'},
          {value: 'income', text: '收入'}
        ]} v-model={category.value}/>
        <LineChart/>
        <PieChart/>
        <Bars/>
      </div>
    );
  }
});