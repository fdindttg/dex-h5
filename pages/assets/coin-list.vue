<template>
  <view class="coin-list layout-page">
    <view :style="{height:taskHeight+'px'}"></view>
    <view>
      <van-search background="transparent" :actionText="$t('common.cancelButtonText')" v-model="filterName" show-action @cancel="$emit('close')" :placeholder="$t('assets.b5')" />
    </view>
    <view class="layout-main">
      <view
        v-for="(item,index) in showList"
        :key="item.coin_name"
        class="p-md align-center justify-between d-flex link-active m-md bg-panel-4 rounded box-shadow"
        @click="$emit('input',item.coin_name);$emit('close')"
		v-if="coin_ids.includes(item.coin_id)"
      >
        <view>{{item.coin_name}}</view>
        <view class="color-light">{{item.usable_balance}}</view>
      </view>
	  <view
	    class="p-md align-center justify-between d-flex link-active m-md bg-panel-4 rounded box-shadow"
	    @click="$emit('input','Bank Card');$emit('close')"
	  >
	    <view>Bank Card</view>
	  </view>
    </view>
  </view>
</template>
<script>
import Wallet from "@/api/wallet";
export default {
  props: {
    value: {
      default: "",
      type: String,
      required: false,
    },
    coin_ids: {
      default: ()=>[1,2,3,1070],
		type: Array,
      required: false,
    },
  },
  data() {
    return {
      filterName: "",
      coinList: [],
      taskHeight:0
    };
  },
  computed: {
    showList() {
      return this.coinList.filter((item) => this.isShow(item.coin_name));
    },
  },
  methods: {
    getCoinList() {
      Wallet.fundAccount()
        .then((res) => {
          this.coinList = res.data.list;
          if (!this.value) {
            this.$emit("input", this.coinList[0].coin_name);
          }
        })
        .catch(() => {});
    },
    isShow(str) {
      return (
        str.toLocaleLowerCase().indexOf(this.filterName.toLocaleLowerCase()) !=
        -1
      );
    },
    getTaskHeight(){
      uni.getSystemInfo({
        success:(obj)=>{
          this.taskHeight = obj.statusBarHeight
        }
      })
    }
  },
  created() {
    this.getTaskHeight()
    this.getCoinList();
  },
};
</script>
<style lang="scss" scoped>
.coin-list {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  animation: coinList 0.3s;
}
@keyframes coinList {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>