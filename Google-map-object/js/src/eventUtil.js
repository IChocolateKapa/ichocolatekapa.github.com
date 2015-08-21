/**
 * Created by Administrator on 2015/8/3.
 */


/*
 һ���¼���
 �¼����������Ǵ�ҳ���н����¼���˳��
 IE���¼������¼�ð��������Netscape���¼������¼�������
 1���¼�ð��
 �¼�ð�ݣ����¼��ʼ��������Ԫ��(�ĵ���Ƕ�ײ��������Ǹ��ڵ�)���գ�Ȼ��������ת���������Ľڵ�(�ĵ�)��
 2���¼�����
 �¼������˼���ǲ�̫����Ľڵ�Ӧ�ø�����յ��¼����������Ľڵ������յ��¼���
 �����¼��������
 1��HTML�¼��������
 2��DOM0���¼��������
 3��DOM2���¼��������
 DOM2���¼��������������������ڴ���ָ����ɾ���¼��������Ĳ�����addEventListener()��removeEventListener()�����Ƕ���������������Ҫ������¼�������Ϊ�¼��������ĺ�����һ������ֵ��
 4��IE�¼��������
 attachEvent()����¼�
 detachEvent()ɾ���¼�
 ����������������ͬ�������������¼���������������¼�������
 5������������¼��������
 �����¼�����
 �¼�����event
 1��DOM�е��¼�����
 (1)��type:��ȡ�¼�����
 (2)��target���¼�Ŀ��
 (3)��stopPropagation() ��ֹ�¼�ð��
 (4)��preventDefault() ��ֹ�¼���Ĭ����Ϊ
 2��IE�е��¼�����
 (1)��type:��ȡ�¼�����
 (2)��srcElement���¼�Ŀ��
 (3)��cancelBubble=true��ֹ�¼�ð��
 (4)��returnValue=false��ֹ�¼���Ĭ����Ϊ
*/

/*��������¼��������*/

var eventUtil = {
    /*���¼�*/
    addHandler: function(element, type, method){
        if(element.addEventListener){
            element.addEventListener(type, method, false);
        } else if(element.attachEvent){
            element.attachEvent('on'+type, method);
        } else{
            /*Dom 0���¼��������*/
            /*js�У����е�����ӵ��¼�������򶼿���ʹ�������������棬 ����*/
            /*element.onclick === element['onclick']*/
            element['on'+type] = method;
        }
    },
    /*ɾ�����¼�*/
    removeHandler: function(element, type, method){
        if(element.removeEventListener){
            element.removeEventListener(type, method, false);
        } else if(element.dettachEvent){
            element.dettachEvent('on'+type, method);
        } else{
            /*Dom 0���¼��������*/
            /*js�У����е�����ӵ��¼�������򶼿���ʹ�������������棬 ����*/
            /*element.onclick === element['onclick']*/
            element['on'+type] = null;
        }
    },

    /*��ȡ�¼�*/
    getEvent: function(event){
        return event?event:window.event;
    },

    /*��ȡ�¼�����*/
    getType: function(event){
        return event.type;
    },

    /*��ȡ�¼�Ŀ�����target*/
    getTarget: function(event){
        return event.target || event.srcElement;
    },

    /*ȡ���¼�Ĭ����Ϊ*/
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        } else{
            event.returnValue = false;
        }
    },

    /*ȡ���¼�ð��*/
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        } else{
            event.cancelBubble = false;
        }
    },

    /*��갴���¼�*/
    enterKeyPress: function(event, handler){
        event = this.getEvent(event);
        if(event.keyCode == 13){
            handler();
        } else{
            return false;
        }
    }


}

