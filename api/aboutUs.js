import Serve from '@/api/serve'

class College {
    // 获取服务的文章详情
    static getServiceDetail(cid) {
        return Serve.get(`/article/serviceDetail?id=${cid}`);
    }
}

export default College;