import emitter from '@/methods/emitter';

export default function (response, title = '更新') {
  // 先判斷自定義的 response.success，若無則判斷 response.data.success
  const isSuccess = typeof response.success !== 'undefined'
    ? response.success
    : response.data && response.data.success;

  if (isSuccess) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title} 成功`,
    });
  } else {
    // 支援自定義 message 或 API message
    let message = '';
    if (response.message) {
      message = response.message;
    } else if (response.data && response.data.message) {
      message = response.data.message;
    }
    const msgArr = typeof message === 'string' ? [message] : message;
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title} 失敗`,
      content: msgArr ? msgArr.join('`') : '',
    });
  }
}
