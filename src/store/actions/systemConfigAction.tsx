import { EDIT_SYSTEM_CONFIG } from "../../constans/systemMaster";
import { SystemConfig } from '../../model/systemConfig';

export const editSystemConfig = (sys: SystemConfig) => ({
    type: EDIT_SYSTEM_CONFIG,
    sys
});
