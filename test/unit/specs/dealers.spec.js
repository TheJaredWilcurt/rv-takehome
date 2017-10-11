import Vue from 'vue';
import dealers from '@/components/dealers';

describe('dealers.vue', function () {
    it('should render correct contents', function () {
        var Constructor = Vue.extend(dealers);
        var vm = new Constructor().$mount();
        expect(vm.$el.querySelector('.well').textContent)
             .to.equal('\n      0 dealers in area');
    });
});
