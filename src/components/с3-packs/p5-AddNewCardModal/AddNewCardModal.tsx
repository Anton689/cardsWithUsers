import addCardStyle from './AddNewCardModal.module.css'

type ModalPropsType = {
    active: boolean;
    setActive: (arg: boolean) => void;
    children: JSX.Element;
}


export const Modal = ({active, setActive, children}: ModalPropsType) => {
    return (
        <div className={active ? `${addCardStyle.modal} ${addCardStyle.active}` : addCardStyle.modal}
             onClick={() => setActive(false)}>
            <div className={active ? `${addCardStyle.modal_content} ${addCardStyle.active}`: addCardStyle.modal_content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}