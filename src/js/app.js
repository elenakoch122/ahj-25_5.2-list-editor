import Widget from './Widget';
import StateService from './StateService';

const stateService = new StateService(localStorage);
const widget = new Widget(stateService);

widget.init();
