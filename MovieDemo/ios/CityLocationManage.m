//
//  CityLocationManage.m
//  MovieDemo
//
//  Created by 曾惠龙 on 2018/3/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CityLocationManage.h"

@implementation CityLocationManage

RCT_EXPORT_MODULE(CityLocationManage);

- (instancetype)init
{
  self = [super init];
  if (self) {
    
  }
  return self;
}

RCT_REMAP_METHOD(LocationForMyCity,resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  [AMapServices sharedServices].apiKey =@"f41f655c8026bbcc1f8e549ea285d567";
  [self.locationManage requestLocationWithReGeocode:YES completionBlock:^(CLLocation *location, AMapLocationReGeocode *regeocode, NSError *error) {
    if (error)
    {
      if (error.code == AMapLocationErrorLocateFailed)
      {
        reject(@"定位失败",@"定位失败",error);
      }
    }else{
      if (regeocode)
      {
        resolve(regeocode.city);
      }
    }
  }];
 
}
-(AMapLocationManager *)locationManage{
  if (_locationManage==nil) {
    _locationManage=[[AMapLocationManager alloc]init];
    // 带逆地理信息的一次定位（返回坐标和地址信息）
    [_locationManage setDesiredAccuracy:kCLLocationAccuracyHundredMeters];
    //   定位超时时间，最低2s，此处设置为2s
    _locationManage.locationTimeout=2;
    //   逆地理请求超时时间，最低2s，此处设置为2s
    _locationManage.reGeocodeTimeout = 2;
  }
  return _locationManage;
}
@end
