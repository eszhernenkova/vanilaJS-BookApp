export class Abstractview {

    constructor() {
        this.app = document.getElementById('root');
    }

 //по умолчанию всегда есть title
    setTitle(title) {
        document.title = title;
    }

//изменения
    render() { 
        return;
    }

    // отмена подписки на изменения
    destroy(){
        return;
    }
}