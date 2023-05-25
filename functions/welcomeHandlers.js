export const onScreenPressHandler = (e, inputNameRef) => {
    if(inputNameRef.current){
        inputNameRef.current.blur();
    }
}

export const onFocusHandler = (e, setNameInputTouched) => {
    setNameInputTouched(false);
}

export const onEndEditingHandler = (e, setNameInputTouched) => {
    setNameInputTouched(true);
}