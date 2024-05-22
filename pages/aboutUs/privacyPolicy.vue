<template>
  <v-page>
    <v-header style="position: fixed;top: 0;width: 100vw;height: 40px;" :title="`${$t('base.f1')}`"></v-header>
    <rich-text style="margin-top: 40px;overflow: auto;" :nodes="article.body"></rich-text>
  </v-page>
</template>
<script>
import College from '@/api/aboutUs'
export default {
  data() {
    return {
      article:{}
    };
  },
  created() {
    College.getServiceDetail(11).then(data => {
                  this.article = data.data;
              }).catch(err => {})
	},
  computed: {
   
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
</style>