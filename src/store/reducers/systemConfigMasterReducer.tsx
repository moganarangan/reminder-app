import { SystemConfig } from '../../model/systemConfig';
import { EDIT_SYSTEM_CONFIG } from '../../constans/systemMaster';

const Initial_State: SystemConfig = {
    taskDateTime: null
};

// Reducers (Modifies The State And Returns A New State)
const systemConfigMaster = (state: SystemConfig = Initial_State, action: any): SystemConfig => {
    switch (action.type) {
        case EDIT_SYSTEM_CONFIG: {
            return { ...state, taskDateTime: action.sys.taskDateTime };
        }

        // Default
        default: {
            return state;
        }
    }
};

// Exports
export default systemConfigMaster;