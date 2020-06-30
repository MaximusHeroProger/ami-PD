//
//  RegisterRouter.swift
//  ami
//
//  Created by Artem Kufaev on 29.06.2020.
//  Copyright © 2020 Artem Kufaev. All rights reserved.
//

import UIKit

class RegisterRouter: BaseRouter {
    
    var infoFillVC: RegisterInfoFillViewController?
    
    func toInfoPlaceholder(email: String, password: String) {
        if infoFillVC == nil {
            infoFillVC = RegisterInfoFillViewControllerBuilder.build(email: email, password: password)
        }
        push(infoFillVC!, animated: true)
    }
    
    func toLogin() {
        let loginVC = LoginViewControllerBuilder.build()
        var transitionOptions = UIWindow.TransitionOptions(direction: .toRight, style: .easeOut)
        transitionOptions.duration = 0.4
        setRoot(loginVC, transitionOptions: transitionOptions)
    }
    
}
