<template>
	<view class="d-flex flex-col">
		<!-- 头部 -->
		<v-header class="nav_bar" :left-text="$t('base.a1')" :left-arrow="false" :left-click="personalCenter">
			<template #left>
				<van-icon name="user-circle-o" class="fn-25" />
			</template>
			<template #title>
				<view class="d-flex align-center justify-center">
					<img class="m-x-xs h-20" :src="logoMap.home_logo" />
					<p>{{ app.appName }}</p>
				</view>
			</template>
			<!-- <template #right>
				<view class="theme-switch m-r-md">
					<label class="v-switch border rounded-xs d-flex" @click="changtTheme">
						<view class="icon border"
							:class="theme == 'light' ? 'bg-gradient-green active' : 'bg-gradient-green'">
							<view class="left color-light">{{ $t("common.light") }}</view>
							<view class="right color-light">{{ $t("common.dark") }}</view>
						</view>
					</label>
				</view>
				<v-link to="/pages/list/list?isSearch=1" class="d-flex align-center">
					<van-icon class="fn-20" name="search" />
				</v-link>
			</template> -->
		</v-header>
		<view class="layout-main">
			<!-- 轮播 -->
			<swiper class="my-swipe m-x-md rounded-sm overflow-hidden" :autoplay="true" indicator-color="white">
				<swiper-item class="my_swipe_item" v-for="(item, idx) in home" :key="idx">
					<img width="100%" height="100%" fit="cover" :src="item.imgurl" />
				</swiper-item>
			</swiper>
			<!-- 公告 -->
			<v-notice-bar v-if="notice.length" class="m-t-md m-x-md bg-panel-1 box-shadow rounded-xs">
				<template #left-icon>
					<van-icon class="m-r-sm fn-16" @click="() => _router.push({ path: '/pages/notice/index' })"
						name="volume-o" />
				</template>
				<v-link class="fn-13 eps-1" :to="{ path: '/pages/notice/detail', query: { id: notice[0].id } }">
					{{ notice[0].title }}
				</v-link>
				<template #right-icon>
					<view class="m-l-xs" @click="_router.push({ path: '/pages/notice/index' })">{{$t('common.more')}}
					</view>
				</template>
			</v-notice-bar>
			<!-- 次一级导航 -->
			<view class="nav2 p-x-md m-t-xl d-flex justify-around fn-center">
				<view tag="div" class="item" @click="jump()">
					<view class="icon fn-22">
						<img class="h-54" src="static/img/renzheng.png" />
					</view>
					<view class="fn-12">{{ $t("common.service") }}</view>
				</view>
				<v-link tag="div" :to="{path:'/pages/base/index',query:{
          tel:'option-list'
        }}" class="item">
					<view class="icon fn-22">
						<img class="h-54" src="static/img/homeqiquanicon.png" />
					</view>
					<view class="fn-12">{{ $t("base.a4") }}</view>
				</v-link>
				<v-link tag="div" :to="{path:'/pages/base/index',query:{
		  tel:'exchange-operation'
		}}" class="item">
					<view class="icon fn-22">
						<img class="h-54" src="static/img/8.png" />
					</view>
					<view class="fn-12">{{ $t("exchange.a1") }}</view>
				</v-link>
				<!--    <view @click="personalCenter" class="item">
          <view class="icon fn-22">
            <img class="h-54" src="static/img/homehuiyuan.png" />
          </view>
          <view class="fn-12">{{ $t("base.a6") }}</view>
        </view> -->
				<!-- h5端跳转下载链接 -->
				<!-- <v-link tag="div" to="/pages/help/index" class="item">
          <view class="icon fn-22">
            <img class="h-54" src="static/img/homexueyuan.png" />
          </view>
          <view class="fn-12">{{ $t("base.a7") }}</view>
        </v-link> -->

			</view>
			<view class="nav2 p-x-md m-t-xl d-flex justify-around fn-center">
				<v-link tag="div" :to="{path:'/pages/pledge/index',query:{
			  tel:'exchange-operation'
			}}" class="item">
					<view class="icon fn-22">
						<img class="h-54" src="static/img/homexueyuan1.png" />
					</view>
					<view class="fn-12">{{ $t("pledge.funcname") }}</view>
				</v-link>
				<v-link tag="div" :to="{path:'/pages/assets/recharge'}" class="item">
					<view class="icon fn-22">
						<img class="h-54" src="static/img/13.png" />
					</view>
					<view class="fn-12">{{ $t("base.b5") }}</view>
				</v-link>
				<!-- <view @tap="jump" class="item">
					<view class="icon fn-22">
						<img class="h-54" src="static/img/13.png" />
					</view>
					<view class="fn-12">{{ $t("base.b5") }}</view>
				</view> -->
				<v-link tag="div" :to="{path:'/pages/assets/draw'}" class="item">
					<view class="icon fn-22">
						<img class="h-54" src="static/img/7.png" />
					</view>
					<view class="fn-12">{{ $t("base.b6") }}</view>
				</v-link>
			</view>
			<view class='middleList bg-panel-3 box-shadow rounded-sm m-x-md'>
				<v-link class="middleArea" v-for="(item, idx) in topList" :to="{
                    path: '/pages/exchange/index',
                    query: { code: item.pair_name },
                  }">
					<view class='color-light' style="text-align:center;">{{item.pair_name}}</view>
					<view :class="taxes(item.increaseStr)" class='coinAmount'>
						{{item.close}}
					</view>
					<view :class="taxes(item.increaseStr)">{{item.increaseStr}}</view>
				</v-link>
			</view>



			<!-- 指数 -->
			<view class="stock-swipe d-flex p-x-md m-t-xl" v-if="false">
				<view class="swipe_right flex-fill box-shadow" v-for="(item, idx) in indexList" :key="idx" @click="
            _router.push({
              path: '/pages/exchange/index',
              query: {
                code: item.pair_name
              },
            })
          ">
					<view class="stock-index item flex-fill p-x-xs p-y-xs rounded-xs box-size bg-panel-3" :key="idx"
						:class="{ 'm-l-md': idx }">
						<view class="stock-index-img fn-12 color-gray-6 m-b-md">
							<view>{{ item.pair_name }}</view>
						</view>
						<view class="fn-18 color-light">{{ item.close }}</view>
						<view class="d-flex flex-col align-center fn-sm"
							:class="item.increase * 1 < 0 ? 'color-sell' : 'color-buy'">
							<view class="stock-item-3">{{ item.increaseStr }}</view>
							<view class="color-theme-6">≈ {{ getOldPrice(item.close, item.increase) }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 科创板 -->
			<view class="head_info m-y-xl">
				<van-tabs v-if="marketList.length" :active="infoActive" background="transparent" :border="false"
					animated class="tabs-border border-b">
					<van-tab v-for="parentItem in marketList" :key="parentItem.coin_name" :title="parentItem.coin_name"
						class="a">
						<view class="w-12/12 p-t-md">
							<view class="fn-center w-max">
								<v-link :to="{
                    path: '/pages/exchange/index',
                    query: { code: item.pair_name },
                  }" class="m-b-md m-x-md rounded-sm bg-panel-3 box-shadow link-active d-flex align-center p-r-md p-y-md box-size"
									v-for="item in parentItem.collect
                    ? collect
                    : parentItem.marketInfoList" :key="item.pair_name">
									<view class="fn-18 w-2/12 d-flex align-center justify-center">
										<img class="d-block h-30 w-30" :src="item.coin_icon" alt="" />
										<!-- <van-icon
                      v-show="isCoolect(item)"
                      class="color-theme-1"
                      name="star"
                    />
                    <van-icon v-show="!isCoolect(item)" name="star-o" /> -->
									</view>
									<view class="color-light fn-left w-4/12">
										<view class="d-flex align-end">{{ item.pair_name }}</view>
									</view>
									<view class="fn-left align-end color-light w-3/12">
										<view class="d-flex align-end">{{ item.close }}</view>
									</view>
									<view class="fn-right w-3/12">
										<span :class="
                        item.increase * 1 < 0 ? 'color-sell' : 'color-buy'
                      ">{{ item.increaseStr }}</span>
									</view>
								</v-link>
							</view>
						</view>
					</van-tab>
				</van-tabs>
			</view>
		</view>
		<!-- 个人主页弹出层 -->
		<van-popup class="personalCenter-main colbg" :show="show" @close="show = false" position="left"
			custom-style="width:75%;height:100%">
			<view class="personalCenter-top">
				<view class="app-nav"></view>
				<view class="theme-switch m-r-md">
					<!-- <label class="v-switch border rounded-xs d-flex" @click="changtTheme">
						<view class="icon border"
							:class="theme == 'light' ? 'bg-gradient-green active' : 'bg-gradient-green'">
							<view class="left color-light">{{ $t("common.light") }}</view>
							<view class="right color-light">{{ $t("common.dark") }}</view>
						</view>
					</label> -->
				</view>
				<view class="information p-l-md" @click="toAccountSettings">
					<img :src="logoMap.login_logo" class="h-50 w-50 d-block m-r-xs rounded-max flex-shrink" />
					<view class="inf-rig flex-fill">
						<span class="fn-lg color-light" v-if="isLogin">{{
              user.account
            }}</span>
						<span class="fn-lg color-light" v-else @click.stop>
							Hello，
							<v-link to="/pages/login/index" class="color-theme-1">{{
                $t("base.b3")
              }}</v-link>
						</span>
						<span
							class="inf-rig-cent fn-sm color-default">UID：{{ isLogin ? (user.zuuid || user.user_id) : "-" }}</span>
						<span
							class="inf-rig-cent fn-sm color-default">{{ $t("common.skor_kredit") }}：{{ isLogin ? user.skor_kredit : "-" }}</span>
					</view>
					<v-link v-if="false" to="/pages/invite/level" style="padding:3px 4px 6px"
						class="bg-panel-4 border border-r-0 rounded-tl-lg rounded-bl-lg border-buy" @click.native.stop>
						<span class="fn-xs color-buy">{{ $t("base.e6") }}</span>
					</v-link>
				</view>
			</view>
			<view class="personalCenter-center border-b border-gray-5">
				<view class="d-flex justify-around">
					<v-link to="/pages/assets/recharge" tag="div" class="d-flex flex-col align-center">
						<img src="static/img/13.png" alt="" class=" h-44" />
						<span class="fn-md color-light p-y-xs">{{ $t("base.b5") }}</span>
					</v-link>
					<v-link to="/pages/assets/draw" tag="div" class="d-flex flex-col align-center">
						<img src="static/img/7.png" alt="" class="h-44" />
						<span class="fn-md color-light p-y-xs">{{ $t("base.b6") }}</span>
					</v-link>
					<v-link to="/pages/invite/index" tag="div" class="d-flex flex-col align-center">
						<img src="static/img/4.png" alt="" class="h-44" />
						<span class="fn-md color-light p-y-xs">{{ $t("base.b7") }}</span>
					</v-link>
				</view>
			</view>
			<view class="personalCenter-bottom">
				<!-- <v-link
		   to="/pages/otc/direct-recharge"
		   tag="div"
		   class="per-bot p-y-sm p-l-sm border-b d-flex align-center"
		 >
		   <img :src="$localImgUrl('Page9.png')" alt="" class="h-20 m-r-xs">
		   <span class="color-light">{{ $t("common.direct-recharge-a1") }}</span>
		 </v-link> -->
				<v-link to="/pages/commission/index" tag="div"
					class="per-bot p-y-sm p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page1.png')" alt="" class="m-r-xs h-20">
					<span class="color-light">{{ $t("base.c1") }}</span>
				</v-link>
				<!-- <v-link
          to="/pages/otc/pays"
          tag="div"
          class="per-bot p-y-sm p-l-sm border-b d-flex align-center"
        >
          <img :src="$localImgUrl('Page9.png')" alt="" class="h-20 m-r-xs">
          <span class="color-light">{{$t('otc.j6')}}</span>
        </v-link> -->
				<v-link to="/pages/auth/index" tag="div" class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page2.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t("base.c2") }}</span>
				</v-link>
				<v-link to="/pages/safe/index" tag="div" class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page3.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t("base.c3") }}</span>
				</v-link>
				<v-link to="/pages/notice/index" tag="div" class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page4.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t("base.c4") }}</span>
				</v-link>
				<v-link to="/pages/assets/address-list" tag="div"
					class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page5.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t("base.c5") }}</span>
				</v-link>
				<view tag="div" class="per-bot p-y-md p-l-sm border-b d-flex align-center" @click="download()">
					<img :src="$localImgUrl('Page4.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t("common.down") }}</span>
				</view>
				<v-link to="/pages/accountSettings/accountSettings" tag="div"
					class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page7.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t("base.c6") }}</span>
				</v-link>
				
				<v-link to="/pages/aboutUs/index" tag="div"
					class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page9.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">{{ $t("base.e9") }}</span>
				</v-link>
				<!-- <v-link
		  to="/pages/pledge/index"
		  tag="div"
		  class="per-bot p-y-md p-l-sm border-b d-flex align-center"
		>
		  <img :src="$localImgUrl('Page7.png')" alt="" class="h-20 m-r-xs" />
		  <span class="color-light">{{ $t("pledge.funcname") }}</span>
		</v-link> -->
				<view class="per-bot p-y-md p-l-sm border-b d-flex align-center">
					<img :src="$localImgUrl('Page6.png')" alt="" class="h-20 m-r-xs" />
					<span class="color-light">
						<v-lang @change="
                marketList = [];
                indexData();
              "></v-lang>
						<i class="iconfont m-l-xs fn-sm">&#xe6e9;</i>
					</span>
				</view>
				<view class="h-100"></view>
			</view>
		</van-popup>
		<van-toast id="van-toast" />

	</view>
</template>

<script>
	import Home from "@/api/home";
	import Wallet from "@/api/wallet";
	import math from "@/utils/class/math.js";
	import app from "@/app";
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		name: "home",
		props: ["isShow"],
		data() {
			return {
				infoActive: 0, // 详情选中
				kfurl:'',
				marketList: [],
				home: {},
				notice: [],
				wap: "",
				indexList: [],
				createList: [],
				list: [],
				page: 1,
				tab: "kcb",
				show: false,
				checked: false,
				collect: [],
				app,
				first: true,
				topList: [],
			};
		},
		computed: {
			...mapState({
				ws: "ws",
				user: "user",
				wsState: "wsState",
				logoMap: "logoMap",
				theme: "theme",
			}),
			isLogin() {
				return Boolean(uni.getStorageSync("token"));
			},
		},
		watch: {
			isShow(n) {
				if (n) {
					this.ws.send({
						cmd: "sub",
						msg: "indexMarketList",
					});
				} else {
					this.ws.send({
						cmd: "unsub",
						msg: "indexMarketList",
					});
				}
				this.getTopList();
			},
		},
		methods: {
			...mapActions({
				setTheme: "setTheme",
				setUserInfo: "setUserInfo",
			}),
			kfline(){
				Home.kfline()
					.then((res) => {
						this.kfurl = res.data.kf
					})
					.catch(() => {});
			},
			jump() {
				window.open(this.kfurl, '_blank');
			},
			download() {
				window.location.href = this.app.downloadUrl;
			},
			taxes(str) {
				// console.log(str);
				let isMul = str && str.search("-");
				if (isMul != '-1') {
					return 'taxes';
				} else {
					return 'taxesG';
				}
			},
			changtTheme() {
				if (this.theme == "light") {
					this.setTheme("dark");
				} else {
					this.setTheme("light");
				}
				// console.log(this.marketList);
			},
			// 获取涨跌之前的价格
			getOldPrice(price, rate) {
				return math.multiple(math.division(price, 1 + rate * 1), rate, 2);
			},
			toAccountSettings() {
				this._router.push({
					path: "/pages/accountSettings/accountSettings"
				});
			},
			personalCenter() {
				this.show = true;
				if (this.isLogin) {
					this.setUserInfo()
				}
			},
			kefu() {
				let metastr = '{"name":"' + this.user.account + '","qq":"' + this.user.user_id + '"}';
				let eid = 'c8e37c6ba47941e476bfff768bbf2150';
				let kf = 'https://www.smartsupp.com/widget/f99fd9c0769ad49bc2a4080d31002bd6a628df2d';
				window.location.href = kf;
				plus.runtime.openURL(kf, function(res) {
					console.log(res);
				});

			},
			indexData() {
				let data = {};
				let ajax = Home.indexList(data, {
					loading: true
				});

				ajax
					.then((res) => {
						this.home = res.data.bannerList;
						this.notice = res.data.noticeList;
						this.indexList = res.data.brokenLine;
						this.marketList = res.data.marketList;
						this.infoActive = 1;
						this.dunshift();
						this.getCollect();
						this.getTopList();
						setTimeout(() => {
							this.first = false;
						}, 600);

					})
					.catch(() => {});
			},
			getTopList() {
				let data = this.marketList[1].marketInfoList;
				// console.log(data);
				this.topList = [];
				data.forEach((item) => {
					if (item.coin_name == "BTC" || item.coin_name == "ETH" || item.coin_name == "AVA") {
						// console.log(item);
						this.topList.push(item);
					}
				});
				// console.log(this.topList);
			},
			dunshift() {
				if (this.marketList.filter((item) => item.collect).length) return;
				this.marketList.unshift({
					coin_name: this.$t("base.c7"),
					collect: true,
					marketInfoList: [],
				});
			},
			// 获取自选交易列表
			getCollect(call) {
				if (!this.isLogin) return;
				Home.getCollect()
					.then((res) => {
						this.collect = res.data || [];
						call && call();
					})
					.catch(() => {});
			},
			// 是否为自选
			isCoolect(i) {
				return this.collect.map((item) => item.pair_name).includes(i.pair_name);
			},
			// 替换自选数据
			replaceOptional() {
				let collect = this.collect.map((item) => item.pair_name);
				this.marketList.forEach((parentItem) => {
					parentItem.marketInfoList.forEach((item) => {
						let idx = collect.indexOf(item.pair_name);
						if (idx != -1) {
							this.collect.splice(idx, 1, item);
						}
					});
				});
			},
			// 添加自选
			option(item) {
				let data = {
					pair_name: item.pair_name,
				};
				Home.option(data)
					.then((res) => {
						this.getCollect();
						if (res.data) {
							this.$toast(this.$t("base.c8"));
						} else {
							this.$toast(this.$t("base.c9"));
						}
					})
					.catch(() => {});
			},
			// 链接socket
			indexMarketList() {
				this.ws.send({
					cmd: "sub",
					msg: "indexMarketList",
				});
				this.ws.on("message", (res) => {
					let {
						data,
						sub
					} = res;
					if (sub == "indexMarketList") {
						this.marketList = data;
						this.dunshift();
						this.replaceOptional();
						this.getTopList();
					}
				});
			},
			// 创建充币地址
			createWalletAddress() {
				Wallet.createWalletAddress()
					.then(() => {})
					.catch(() => {});
			},
		},
		mounted() {
			this.kfline()
			this.indexData();
			this.indexMarketList();

			if (this.isLogin) {
				this.createWalletAddress();
			}
		},
		destroyed() {},
	};
</script>
<style lang="scss" scoped>
	.middleList {
		display: flex;
		margin: 55rpx 0 0;
		justify-content: space-around;
		padding: 15rpx;
	}

	.middleArea {
		width: 30%;
	}

	.coinHeader {
		display: flex;
		font-size: 6rpx;
		margin-bottom: 12rpx;
	}

	.coinName {
		color: #909090
	}

	.taxes {
		color: #ea3131;
		margin-left: 2px;
		text-align: center;
	}

	.taxesG {
		color: #79D47C;
		margin-left: 2px;
		text-align: center;
	}

	.coinAmount {
		font-size: 40rpx;
		margin: 10rpx 0;
	}

	.a {
		margin-bottom: 30rpx;
	}

	.colbg {
		background-color: $bg;
	}

	.my-swipe {
		height: 150px;

		.van-image {
			padding: 0 18px;
			box-sizing: border-box;

			::v-deep img.van-image__img {
				border-radius: 9px !important;
			}
		}
	}

	.notice-swipe {
		height: 24px;
	}

	// #ff4d5c
	.nav2 {
		.color-gray-6 {
			color: #f8a12e;
		}
	}

	.stock-swipe {
		.stock-index {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;

			.stock-item-3 {
				padding: 3px 0;
			}
		}
	}

	.theme-switch {
		display: flex;
		justify-content: flex-end;
		padding: 10% 0;

		.v-switch {
			$width: 50px;
			$icon-width: 20px;
			display: block;
			position: relative;
			height: 20px;
			width: $width;
			background: rgba($green, 0.2);
			overflow: hidden;

			.icon {
				position: absolute;
				top: 0;
				width: $icon-width;
				height: 20px;
				border-radius: inherit;
				transition: left 0.3s;

				.left,
				.right {
					position: absolute;
					width: $width;
					height: 100%;
					top: -22rpx;
					box-sizing: border-box;
					text-align: center;

					&.left {
						right: 0;
						padding-right: $icon-width;
					}

					&.right {
						padding-left: $icon-width;
						left: 0;
					}
				}
			}

			.icon {
				left: 0;
			}

			.active.icon {
				left: $width - $icon-width;
			}
		}
	}

	.personalCenter-main {
		.personalCenter-top {
			box-sizing: border-box;

			.theme-switch {
				.v-switch {

					.left,
					.right {
						top: 0;
					}
				}
			}


			.information {
				display: flex;
				align-items: flex-start;

				.inf-head-img {
					border-radius: 50%;
					margin-right: 4%;
				}

				.inf-rig {
					display: flex;
					flex-direction: column;
					letter-spacing: 1px;
					flex: 1;

					span:first-child {
						font-weight: 600;
						margin-bottom: 2px;
					}

					.inf-rig-cent {
						padding: 0 0 4px;
					}

					.vip-grade {
						display: flex;
						align-items: center;
						justify-content: flex-end;

						.progress-bar {
							width: 50%;
						}

						.progress-img {
							padding: 0 5px;
						}
					}
				}
			}
		}

		.personalCenter-center {
			padding: 20px 10px 10px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.personalCenter-bom {
				padding-top: 30px;

				.available-money {
					margin: 10px 0 0;
					height: 60%;
					background: rgba(100, 101, 102, 0.2);
					border-radius: 0 7px 7px 7px;
					align-items: center;
					padding: 6px 5px;
				}
			}
		}
	}

	.user-icon {
		font-size: 50px;
	}

	.epss-1 {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fn-12 {
		width: 65px;
		max-height: 80px;
		word-wrap: break-word;
		word-break: keep-all;
		overflow: hidden;
	}
</style>
