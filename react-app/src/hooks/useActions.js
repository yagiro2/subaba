import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useMemo } from 'react';

const useActions = (actionCreators) => {
    const dispatch = useDispatch();
    return useMemo(
        () => bindActionCreators(actionCreators, dispatch),
        [ dispatch, actionCreators ]
    );
};

export default useActions;