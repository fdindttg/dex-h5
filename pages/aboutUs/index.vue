<template>
  <v-page>
    <v-header :title="$t('base.e9')"></v-header>
   <main class=" m-x-lg m-y-lg p-x-md bg-panel-3 rounded-md box-shadow">
    <view class="list">
      <v-link
          tag="li"
          to="/pages/aboutUs/userProtocol"
          class="item link-active d-flex p-x-md p-y-md align-center border-b"
        >
          <view class="flex-fill d-flex justify-between m-r-xs">
            <view class="color-light">{{$t('base.f0')}}</view>
          </view>
          <van-icon name="arrow" />
        </v-link>
        <v-link
          tag="li"
          to="/pages/aboutUs/privacyPolicy"
          class="item link-active d-flex p-x-md p-y-md align-center border-b"
        >
          <view class="flex-fill d-flex justify-between m-r-xs">
            <view class="color-light">{{$t('base.f1')}}</view>
          </view>
          <van-icon name="arrow" />
        </v-link>
        <v-link
          tag="li"
          to="/pages/aboutUs/legalDeclaration"
          class="item link-active d-flex p-x-md p-y-md align-center border-b"
        >
          <view class="flex-fill d-flex justify-between m-r-xs">
            <view class="color-light">{{$t('base.f2')}}</view>
          </view>
          <van-icon name="arrow" />
        </v-link>
        <v-link
          tag="li"
          to="/pages/aboutUs/aboutUs"
          class="item link-active d-flex p-x-md p-y-md align-center border-b"
        >
          <view class="flex-fill d-flex justify-between m-r-xs">
            <view class="color-light">{{$t('base.e9')}}</view>
          </view>
          <van-icon name="arrow" />
        </v-link>
    </view>
      
   </main>
     
   
    <van-toast id="van-toast" />
  </v-page>
</template>
<script>
export default {

  data() {
    return {
      
    };
  },
  methods: {
   
    
  },
  onShow() {
    
  },
  mounted(){
   
  }
};
</script>