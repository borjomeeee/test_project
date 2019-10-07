module.exports = () => {
    let block = document.querySelector('#ya-share2');

    Ya.share2(block, {
        content: {
            url: 'https://yandex.com',
            title: 'Yandex',
            description: 'All about Yandex',
            image: 'https://yastatic.net/morda-logo/i/logo.svg',
        },
        theme: {
            services: 'facebook,odnoklassniki,vkontakte,twitter,telegram',
            lang: 'ru',
            limit: 3,
            size: 'm',
            copy: 'hidden'
        }
    });
}