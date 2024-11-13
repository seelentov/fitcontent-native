import { actions } from '@store//store'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}