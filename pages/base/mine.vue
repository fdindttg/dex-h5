<template>
	<view class="flex-col">
		<v-header :title="$t('base.d2')" :left-arrow="false">
			<!-- <template #right>
				<view class="theme-switch">
					<label class="v-switch border rounded-xs d-flex" @click="changtTheme">
						<view class="icon border"
							:class="theme == 'light' ? 'bg-gradient-green active' : 'bg-gradient-green'">
							<view class="left color-light">{{ $t("common.light") }}</view>
							<view class="right color-light">{{ $t("common.dark") }}</view>
						</view>
					</label>
				</view>
			</template> -->
		</v-header>
		<!-- <view style="height: var(--status-bar-height)"></view> -->
		<view
			class="head bg-panel-3 h-66 p-x-md m-x-md d-flex justify-between align-center bgb4 rounded-md color-plain p-y-xl">
			<view>
				<view class="d-flex">
					<text class="fn-sm d-block m-t-md">{{ $t("base.d6") }}(USDT)</text>
					<view class="fn-20 m-t-md m-l-md" @click="setHide(!hideMoney)">
						<van-icon v-if="!hideMoney" name="eye-o" />
						<van-icon v-else name="closed-eye" />
					</view>
				</view>

				<view class="m-t-md">
					<text class="fn-28">{{ filterMoney(account.total_assets_usd) }}</text>
					<!-- <text class="fn-sm m-l-md"
            >≈{{ filterMoney(account.total_assets_btc) }}BTC</text
          > -->
				</view>
			</view>
		</view>
		<view class="layout-main" style="padding-bottom: 100rpx;">
			<!-- 头部 -->
			<view class="top p-t-md">
				<van-tabs :active="tabActive" @change="changtTab" :border="false" v-if="show" :line-width="30" swipeable
					animated class="tabs-main d-flex justify-between align-center flex-col">
					<van-tab :title="$t('base.d7')" :name="0">
						<view class="m-x-md">
							<view class="m-y-lg">
								<view class="bg-panel-3 p-xs p-x-md rounded-lg bgb3"
									:class="theme == 'light' ? 'bgb3-white' : ''" style="position: relative">
									<text class="fn-sm d-block color-gray-6 m-t-xs">{{ $t("base.d6") }}(USDT)</text>

									<text
										class="fn-20 d-block color-light m-t-md">{{ filterMoney(account.funds_account_usd) }}
										USDT</text>
									<!-- <text class="fn-sm d-block m-t-xs color-gray-6"
                    >{{ filterMoney(account.funds_account_btc) }} BTC</text
                  > -->
									<view class="p-x-md p-t-xs" style="margin-top: 10px">
										<view class="d-flex justify-between align-center rounded-lg">
											<v-link tag="view" to="/pages/assets/recharge" class="d-flex">
												<view class="m-r-xs align-center">
													<img :src="$localImgUrl('fill3.png')" alt="" class="h-18" />
												</view>
												<text class="color-light fn-middle">{{
                          $t("base.b5")
                        }}</text>
											</v-link>
											<!-- <view @tap="kfline" class="d-flex">
																	<view class="m-r-xs align-center">
																		<img :src="$localImgUrl('fill3.png')" alt="" class="h-18" />
																	</view>
																	<text class="color-light fn-middle">{{
											  $t("base.b5")
											}}</text>
											</view>
											 -->
												
											<v-link tag="view" to="/pages/assets/draw" class="d-flex">
												<view class="m-r-xs align-center">
													<img :src="$localImgUrl('fill5.png')" alt="" class="h-18" />
												</view>
												<text class="color-light fn-middle">{{
                          $t("base.b6")
                        }}</text>
											</v-link>
											<v-link tag="view" to="/pages/transfer/index" class="d-flex">
												<view class="m-r-xs align-center">
													<img :src="$localImgUrl('fill4.png')" alt="" class="h-18" />
												</view>
												<text class="color-light fn-middle">{{
                          $t("base.d8")
                        }}</text>
											</v-link>
										</view>
									</view>
								</view>
							</view>

							<view class="h-60 d-flex justify-between align-center">
								<van-field :value="searchText" @input="searchText = $event.detail" left-icon="search"
									:placeholder="$t('base.d9')" input-class="fn-12 "
									class="flex-fill color-gray-6 bg-form-panel-4 rounded-md pos fn-12 m-r-md"
									style="padding-left: 0" />
								<text class="color-gray-6 p-r-xs">{{ $t("base.e0") }}0{{ $t("base.e1") }}</text>
								<van-checkbox :value="hide" @change="hide = !hide" icon-size="16"></van-checkbox>
							</view>
							<view :to="{
                  path: '/pages/assets/bill',
                  query: { coin_name: item.coin_name },
                }" v-show="ifShow(item)" class="p-t-xs d-block bg-panel-3 rounded-md box-shadow" style="margin: 10px 0"
								v-for="(item, index) in list" :key="index">
								<view class="m-x-md d-flex justify-between align-center p-b-sm">
									<view>
										<img :src="item.image" class="w-20 h-20 rounded-max fn-middle" />
										<text class="fn-16 color-light fn-middle p-l-sm">{{
                      item.coin_name
                    }}</text>
									</view>
									<view>
										<text class="fn-lg color-light fn-middle">{{
                      add(
                        item.usable_balance,
                        item.freeze_balance,
                        item.priceDecimals
                      )
                    }}</text>
										<!-- <van-icon
                      class="p-l-xs fn-middle"
                      name="arrow"
                      size="16"
                      color="#646566"
                    /> -->
									</view>
								</view>
								<view class="p-x-md d-flex justify-between align-center">
									<view class="w-4/12">
										<p class="color-gray-6" style="padding: 5px 0">
											{{ $t("base.b9") }}
										</p>
										<p class="fn-xs color-light">{{ item.usable_balance }}</p>
									</view>
									<view class="w-4/12">
										<p class="color-gray-6" style="padding: 5px 0">
											{{ $t("base.e2") }}
										</p>
										<p class="fn-xs color-light">{{ item.freeze_balance }}</p>
									</view>
									<view class="w-4/12 fn-right">
										<p class="color-gray-6" style="padding: 5px 0">
											{{ $t("base.e3") }}(USD)
										</p>
										<p class="fn-xs color-light">
											{{ omitTo(item.usd_estimate, item.priceDecimals) }}
										</p>
									</view>
								</view>
								<view class="h-4 m-t-xs"></view>
							</view>
						</view>
					</van-tab>

					<van-tab :title="$t('base.e4')" :name="1" class="p-t-md">
						<view class="m-x-md">
							<view class="bgb3 p-x-md p-y-lg rounded-lg" :class="theme == 'light' ? 'bgb3-white' : ''"
								style="position: relative">
								<view class="fn-sm d-flex justify-between color-gray-6 m-t-xs">
									<span> USDT </span>
									<v-link class="color-buy" to="/pages/assets/account-bill">{{ $t("base.e4") }}
										<van-icon class="fn-middle" name="arrow" size="16" />
									</v-link>
								</view>
								<span class="fn-20 d-block color-light m-t-md">{{ filterMoney(account.contract_account_usd)
                  }}{{ account.symbol }}</span>
								<view class="d-flex justify-between m-t-xs">
									<v-link to="/pages/transfer/index" class="d-flex">
										<view class="m-r-xs align-center">
											<img :src="$localImgUrl('fill4.png')" alt="" class="h-18" />
										</view>
										<!-- <van-icon class="color-theme-1 fn-26 fn-middle m-r-xs" name="exchange" /> -->
										<text class="color-light fn-middle">{{
                      $t("base.d8")
                    }}</text>
									</v-link>
								</view>
							</view>
						</view>
					</van-tab>
				</van-tabs>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	import Home from "@/api/home";
	import Wallet from "@/api/wallet";
	import math from "@/utils/class/math.js";
	import Contract from "@/api/contract.js";
	export default {
		name: "mine",
		data() {
			return {
				kfurl:'',
				account: {},
				list: [],
				tabActive: 0, // 切换选择
				searchText: "",
				hide: false,
				show: false,
				accountDetail: {},
			};
		},
		computed: {
			...mapState({
				hideMoney: "hideMoney",
				theme: "theme",
			}),
		},
		props: {
			isShow: {
				default: true,
				type: Boolean,
				required: false,
			},
		},
		watch: {
			isShow(n, o) {
				if (n) {
					this.upDateData();
				}
			},
		},
		methods: {
			
			omitTo: math.omitTo,
			// 计算和
			add: math.add,
			...mapActions({
				setHide: "hideMoney",
				setTheme: "setTheme",
			}),
			kfline1(){
				Home.kfline()
					.then((res) => {
						this.kfurl = res.data.kf
					})
					.catch(() => {});
			},
			kfline() {
				window.open(this.kfurl, '_blank');
			},
			//切换主题
			changtTheme() {
				if (this.theme == "light") {
					this.setTheme("dark");
				} else {
					this.setTheme("light");
				}
			},
			filterMoney(val) {
				if (this.hideMoney) return "******";
				return this.omitTo(val, 8);
			},

			ifShow(item) {
				// 搜索过滤
				let show =
					item.coin_name
					.toLocaleLowerCase()
					.indexOf(this.searchText.toLocaleLowerCase()) != -1;
				if (!this.hide) return true && show;

				// 0余额资金过滤
				let hasMoney =
					this.add(item.usable_balance, item.freeze_balance, item.priceDecimals) *
					1 !=
					0;
				return hasMoney && show;
			},
			fundAccount() {
				Wallet.fundAccount().then((res) => {
					this.list = res.data.list;
				});
			},
			personalAssets() {
				Wallet.personalAssets().then((res) => {
					this.account = res.data;
				});
			},
			// 获取合约列表
			accounts() {
				Contract.contractAccount().then((res) => {
					this.accountDetail = res.data;
				});
			},
			changtTab($ev) {
				this.tabActive = $ev.detail.name;
				this.upDateData();
			},
			// 刷新数据
			upDateData() {
				if (this.tabActive == 1) {
					this.accounts();
				} else {
					this.personalAssets();
					this.fundAccount();
				}
			},
		},
		mounted() {
			this.show = true;
		},
		created() {
			this.kfline1()
			this.upDateData();
		},
	};
</script>

<style lang="scss" scoped>
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

	.tabs-main {
		::v-deep.van-tabs {
			width: 100%;
		}

		::v-deep.van-tabs__wrap,
		::v-deep.van-tabs__content {
			// width: 100%;
		}

		::v-deep.van-tabs__content {
			flex: 1;
			overflow: hidden;
		}

		::v-deep.van-pull-refresh {
			height: calc(100vh - 200px);
			overflow-y: auto;
		}

		::v-deep.van-cell {
			background: transparent;

			&::after {
				border-width: 0;
			}
		}

		::v-deep .van-cell__left-icon {
			color: $white;
		}
	}

	.bgb3 {
		background: url(../../static/img/bgb3.png) no-repeat;
		background-size: 100% auto;
		background-position: right bottom;

		&.bgb3-white {
			background-image: url(../../static/img/light/bgb3.png);
		}
	}

	.bgb4 {
		background: url(../../static/img/bgb4.png) no-repeat;
		background-size: 100% auto;
		background-position: right bottom;
	}

	.pos {
		position: relative;
	}

	.posa {
		position: absolute;
	}
</style>
