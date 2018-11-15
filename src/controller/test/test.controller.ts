import { Logging } from './../../services/logging.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { SuccessResponseModel } from '../../models/successresponse.models';
// import { dataAccessAssets } from '../../dataAccess/Assets.dataAccess';
import Assets from '../../models/assets.models';


// var User = require('./../models/user');
const vEnv = require('../../config/mode.json')['mode'];
const vConfig = require('../../config/config.json')[vEnv];


var mongoose = require('mongoose');
// const assets = new dataAccessAssets;

export interface AppControllerInterface{
}

export class TestController implements AppControllerInterface{
    constructor(){
        Logging("Instantiate App Controller..");
    }
    
    async TestJSON(pRequest:any, pResponse:any){
        try{
            var result:any = [{"nama":"ricky"},{"nama":"dodi"},{"nama":"andi"},{"nama":"gama"}];
            pResponse.status(200).json(SuccessResponseModel.getSuccessResp({'result':result}));
        }
        catch(err){
            Logging(err);
            if(err.code){
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, err.code, err.desc);
            }
            else{
                ErrorHandlingService.throwHTTPErrorResponse(pResponse, 500, 54000, err);
            }
        }
    }

    async getAllAssets(req:any, res:any, next:any){
        // assets.getAllAssets().then(
        //     resolve => {
        //         res.status(200).json(resolve);
        //     },
        //     reject =>{
        //         console.log(reject);
        //         res.status(400).json(reject);
        //     }
        // )
    }
}