export class post {
hostName:string;
businessImg:string
userId:string;
img:string;
desc:string;
cartype:string;
kms:string;
ownersnumber:string;
carcolor:string;
caryear:string;
viewed:Number;


constructor(hostName:string,businessImg:string, userId:string,
            img:string , desc:string ,cartype:string,
            kms:string ,ownersnumber:string ,carcolor:string,
            caryear:string){
this.hostName=hostName;
this.businessImg=businessImg;
this.userId=userId;
this.img=img;
this.desc=desc;
this.cartype=cartype;
this.kms=kms;
this.ownersnumber=ownersnumber;
this.carcolor=carcolor;
this.caryear=caryear
this.viewed=1;
}
}