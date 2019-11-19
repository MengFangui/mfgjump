/**
 * @file modal
 * @author zhangjingyuan02
 */

import {callback} from '../../lib/utils';

const modalMaskStyle = {
    position: 'fixed',
    zIndex: 909,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.65)',
    animation: 'jumpCustomShowMaskAnimation .3s',
    webkitAnimation: 'jumpCustomShowMaskAnimation .3s'
};

const modalWrapperStyle = {
    position: 'fixed',
    zIndex: 910,
    top: '50%',
    left: 0,
    right: 0,
    display: 'block',
    transform: 'translate(0, -50%)',
    webkitTransform: 'translate(0, -50%)'
};

const modalBoxStyle = {
    display: 'flex',
    display: '-webkit-flex',
    width: '100%',
    alignItems: 'center',
    webkitAlignItems: 'center',
    justifyContent: 'center',
    webkitJustifyContent: 'center',
    animation: 'jumpCustomZoominAnimation .3s',
    webkitAnimation: 'jumpCustomZoominAnimation .3s'
};

const modalTitleStyle = {
    fontSize: '24px',
    color: '#555',
    width: '100%',
    padding: '20px 10px 10px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textAlign: 'center',
    boxSizing: 'border-box'
};

const modalContentStyle = {
    fontSize: '16px',
    lineHeight: '20px',
    color: '#999',
    width: '100%',
    padding: '0 16px 30px',
    textAlign: 'center',
    boxSizing: 'border-box'
};

const modalBtnStyle = {
    display: 'flex',
    display: '-webkit-flex',
    alignItems: 'center',
    webkitAlignItems: 'center',
    justifyContent: 'center',
    webkitJustifyContent: 'center',
    fontSize: '17px',
    height: '40px',
    lineHeight: '40px',
    textAlign: 'center',
    borderTop: '1px #eee solid'
};


function create(option) {
    remove();
    const {
        title,
        content,
        showCancel,
        cancelText,
        cancelColor,
        confirmText,
        confirmColor,
        success,
        complete
    } = option;

    const modalMask = document.createElement('div');
    modalMask.id = 'jump-custom-modal-mask';
    Object.keys(modalMaskStyle).forEach(key => {
        modalMask.style[key] = modalMaskStyle[key];
    });

    const modalWrapper = document.createElement('div');
    modalWrapper.id = 'jump-custom-modal';
    Object.keys(modalWrapperStyle).forEach(key => {
        modalWrapper.style[key] = modalWrapperStyle[key];
    });

    const modalBox = document.createElement('div');
    Object.keys(modalBoxStyle).forEach(key => {
        modalBox.style[key] = modalBoxStyle[key];
    });

    const modal = document.createElement('div');
    modal.style.borderRadius = '6px';
    modal.style.width = '80%';
    modal.style.backgroundColor = '#fff';
    modal.style.margin = 'auto';

    const modalTitle = document.createElement('div');
    Object.keys(modalTitleStyle).forEach(key => {
        modalTitle.style[key] = modalTitleStyle[key];
    });
    modalTitle.innerText = title;

    const modalContent = document.createElement('div');
    Object.keys(modalContentStyle).forEach(key => {
        modalContent.style[key] = modalContentStyle[key];
    });
    modalContent.innerText = content;

    const modalBtn = document.createElement('div');
    Object.keys(modalBtnStyle).forEach(key => {
        modalBtn.style[key] = modalBtnStyle[key];
    });

    // 取消按钮
    const modalCancelBtn = document.createElement('div');
    modalCancelBtn.id = 'jump-custom-modal-cancel-btn';
    Object.assign(modalCancelBtn.style, {
        color: cancelColor,
        width: '50%',
        height: '40px',
        borderRight: '1px #eee solid'
    });
    modalCancelBtn.innerText = cancelText.length > 4 ? cancelText.substring(0, 4) : cancelText;

    // 确认按钮
    const modalConfirmBtn = document.createElement('div');
    modalConfirmBtn.id = 'jump-custom-modal-confirm-btn';
    Object.assign(modalConfirmBtn.style, {
        color: confirmColor,
        width: '50%',
        height: '40px'
    });
    modalConfirmBtn.innerText = confirmText.length > 4 ? confirmText.substring(0, 4) : confirmText;

    modal.appendChild(modalTitle);
    modal.appendChild(modalContent);
    showCancel && modalBtn.appendChild(modalCancelBtn);
    modalBtn.appendChild(modalConfirmBtn);
    modal.appendChild(modalBtn);

    modalBox.appendChild(modal);
    modalWrapper.appendChild(modalBox);
    document.body.appendChild(modalWrapper);
    document.body.appendChild(modalMask);

    let resInfo = {
        errMsg: 'showModal:ok',
        confirm: false,
        cancel: false
    };
    const jumpConfirmBtn = document.querySelector('#jump-custom-modal #jump-custom-modal-confirm-btn');
    const jumpCancelBtn = document.querySelector('#jump-custom-modal #jump-custom-modal-cancel-btn');
    jumpConfirmBtn.onclick = () => {
        resInfo.confirm = true;
        remove();
        callback(success, resInfo);
        callback(complete, resInfo);
        return Promise.resolve(resInfo);
    };
    jumpCancelBtn && (jumpCancelBtn.onclick = () => {
        resInfo.cancel = true;
        remove();
        callback(success, resInfo);
        callback(complete, resInfo);
        return Promise.resolve(resInfo);
    });

}

function remove() {
    const jumpModal = document.querySelector('#jump-custom-modal');
    const jumpModalMask = document.querySelector('#jump-custom-modal-mask');
    jumpModal && jumpModal.parentNode.removeChild(jumpModal);
    jumpModalMask && jumpModalMask.parentNode.removeChild(jumpModalMask);
}

/* eslint-disable fecs-export-on-declare */
export {
    create
};