import { AppController } from './controller/app/app.controller';
import { TestController } from './controller/test/test.controller';

export function Routing(router:any, multipart:any){

    const testController:TestController = new TestController();
    //it will call function in controller by the link
    router.get('/test/test1',testController.TestJSON);

    const appController:AppController = new  AppController();
    router.get('/app/version',appController.getAppVersion); 
    
}
