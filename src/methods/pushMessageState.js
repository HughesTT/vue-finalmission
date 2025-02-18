import emitter from '@/methods/emitter';

export default function (response, title = '更新') {
  if (response.data.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title} 成功`,
    });
  } else {
    const message = typeof response.data.message === 'string' ? [response.data.message] : response.data.message;
    // 以條件運算子宣告message，依照條件判斷message須回傳哪個值
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title} 失敗`,
      content: message.join('`'),
    });
  }
}
