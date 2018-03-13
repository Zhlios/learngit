//
//  CityLocationManage.h
//  MovieDemo
//
//  Created by 曾惠龙 on 2018/3/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AMapFoundationKit/AMapFoundationKit.h>
#import <AMapLocationKit/AMapLocationKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
@interface CityLocationManage : NSObject<RCTBridgeModule>
@property(nonatomic,strong)AMapLocationManager *locationManage;
@end
