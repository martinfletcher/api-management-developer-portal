import "./polyfills";
import "./bindingHandlers/scrollintoview";
import "./bindingHandlers/copyToClipboard";
import "./bindingHandlers/syntaxHighlight";
import "./bindingHandlers/markdown";
import "./bindingHandlers/barChart";
import "./bindingHandlers/mapChart";
import "./bindingHandlers/minMaxAvgChart";
import "./bindingHandlers/acceptChange";
import "./themes/website/scripts";
import "@paperbits/core/ko/bindingHandlers/bindingHandlers.component";
import "@paperbits/core/ko/bindingHandlers/bindingHandlers.focus";
import "@paperbits/core/ko/bindingHandlers/bindingHandlers.activate";
import { RouteHelper } from "./routing/routeHelper";
import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { DefaultEventManager } from "@paperbits/common/events";
import { XmlHttpRequestClient } from "@paperbits/common/http";
import { SettingsProvider } from "@paperbits/common/configuration";
import { DefaultRouter } from "@paperbits/common/routing";
import { ConsoleLogger } from "@paperbits/common/logging";
import { KnockoutRegistrationLoaders } from "@paperbits/core/ko/knockout.loaders";
import { ApiList, ApiListDropdown, ApiListTiles } from "./components/apis/list-of-apis/ko/runtime";
import { ApiService } from "./services/apiService";
import { TagService } from "./services/tagService";
import { TenantService } from "./services/tenantService";
import { AnalyticsService } from "./services/analyticsService";
import { ApiDetails } from "./components/apis/details-of-api/ko/runtime/api-details";
import { ApiHistory } from "./components/apis/history-of-api/ko/runtime/api-history";
import { OperationDetails } from "./components/operations/operation-details/ko/runtime/operation-details";
import { OperationConsole } from "./components/operations/operation-details/ko/runtime/operation-console";
import { ProductService } from "./services/productService";
import { FileInput } from "./components/file-input/file-input";
import { MapiClient } from "./services/mapiClient";
import { UsersService } from "./services/usersService";
import { Signin } from "./components/users/signin/ko/runtime/signin";
import { SignInAad } from "./components/users/signin-social/ko/runtime/signin-aad";
import { SignInAadB2C } from "./components/users/signin-social/ko/runtime/signin-aad-b2c";
import { Signup } from "./components/users/signup/ko/runtime/signup";
import { SignupSocial } from "./components/users/signup-social/ko/runtime/signup-social";
import { Profile } from "./components/users/profile/ko/runtime/profile";
import { Subscriptions } from "./components/users/subscriptions/ko/runtime/subscriptions";
import { ProductList } from "./components/products/product-list/ko/runtime/product-list";
import { ProductDetails } from "./components/products/product-details/ko/runtime/product-details";
import { ProductSubscribe } from "./components/products/product-subscribe/ko/runtime/product-subscribe";
import { DefaultAuthenticator } from "./components/defaultAuthenticator";
import { Spinner } from "./components/spinner/spinner";
import { ProductApis } from "./components/products/product-apis/ko/runtime/product-apis";
import { OperationList } from "./components/operations/operation-list/ko/runtime/operation-list";
import { ProductSubscriptions } from "./components/products/product-subscriptions/ko/runtime/product-subscriptions";
import { AadService } from "./services/aadService";
import { BackendService } from "./services/backendService";
import { HipCaptcha } from "./components/users/runtime/hip-captcha/hip-captcha";
import { ResetPassword } from "./components/users/reset-password/ko/runtime/reset-password";
import { ConfirmPassword } from "./components/users/confirm-password/ko/runtime/confirm-password";
import { ChangePassword } from "./components/users/change-password/ko/runtime/change-password";
import { Reports } from "./components/reports/ko/runtime/reports";
import { UnhandledErrorHandler } from "./bindingHandlers/unhandledErrorHandler";
import { ProductListDropdown } from "./components/products/product-list/ko/runtime/product-list-dropdown";
import { ValidationSummary } from "./components/users/validation-summary/ko/runtime/validation-summary";
import { TypeDefinitionViewModel } from "./components/operations/operation-details/ko/runtime/type-definition";
import { CodeSampleViewModel } from "./components/operations/operation-details/ko/runtime/code-sample";
import { VisibilityGuard } from "@paperbits/common/user";
import { StaticUserService } from "./services";
import { SignOutRouteGuard } from "./routing/signOutRouteGuard";
import { ProvisionService } from "./services/provisioningService";
import { OAuthService } from "./services/oauthService";
import ClientOAuth2 = require("client-oauth2");


export class ApimRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new KnockoutRegistrationLoaders());
        injector.bindSingleton("eventManager", DefaultEventManager);
        injector.bindSingleton("logger", ConsoleLogger);
        injector.bindCollection("autostart");
        injector.bindToCollection("autostart", UnhandledErrorHandler);
        injector.bindCollection("routeGuards");
        injector.bindToCollection("routeGuards", SignOutRouteGuard);
        injector.bindToCollection("autostart", VisibilityGuard);
        injector.bindSingleton("router", DefaultRouter);
        injector.bind("apiList", ApiList);
        injector.bind("apiListDropdown", ApiListDropdown);
        injector.bind("apiListTiles", ApiListTiles);
        injector.bind("apiDetails", ApiDetails);
        injector.bind("apiHistory", ApiHistory);
        injector.bind("operationDetails", OperationDetails);
        injector.bind("operationConsole", OperationConsole);
        injector.bind("typeDefinition", TypeDefinitionViewModel);
        injector.bind("codeSample", CodeSampleViewModel);
        injector.bind("fileInput", FileInput);
        injector.bind("apiService", ApiService);
        injector.bind("tagService", TagService);
        injector.bind("productService", ProductService);
        injector.bind("analyticsService", AnalyticsService);
        injector.bind("signin", Signin);
        injector.bind("signInAad", SignInAad);
        injector.bind("signInAadB2C", SignInAadB2C);
        injector.bind("signup", Signup);
        injector.bind("signupSocial", SignupSocial);
        injector.bind("profile", Profile);
        injector.bind("subscriptions", Subscriptions);
        injector.bind("productList", ProductList);
        injector.bind("productListDropdown", ProductListDropdown);
        injector.bind("validationSummary", ValidationSummary);
        injector.bind("productDetails", ProductDetails);
        injector.bind("productSubscribe", ProductSubscribe);
        injector.bind("productSubscriptions", ProductSubscriptions);
        injector.bind("productApis", ProductApis);
        injector.bind("operationList", OperationList);
        injector.bind("operationDetails", OperationDetails);
        injector.bind("usersService", UsersService);
        injector.bind("reports", Reports);
        injector.bind("hipCaptcha", HipCaptcha);
        injector.bind("resetPassword", ResetPassword);
        injector.bind("confirmPassword", ConfirmPassword);
        injector.bind("changePassword", ChangePassword);
        injector.bind("spinner", Spinner);
        injector.bindSingleton("tenantService", TenantService);
        injector.bindSingleton("backendService", BackendService);
        injector.bindSingleton("aadService", AadService);
        injector.bindSingleton("mapiClient", MapiClient);
        injector.bindSingleton("httpClient", XmlHttpRequestClient);
        injector.bindSingleton("settingsProvider", SettingsProvider);
        injector.bindSingleton("authenticator", DefaultAuthenticator);
        injector.bindSingleton("routeHelper", RouteHelper);
        injector.bindSingleton("userService", StaticUserService);
        injector.bindSingleton("provisioningService", ProvisionService);

        injector.bind("oauthService", OAuthService);
    }
}


const githubAuth = new ClientOAuth2({
    clientId: "754ec8dabea9c0b296d2",
    accessTokenUri: "https://github.com/login/oauth/access_token",
    authorizationUri: "https://github.com/login/oauth/authorize",
    redirectUri: "https://published.apim.net/api-details/",
    scopes: ["notifications", "gist"]
});

window["oauth2Callback"] = async (uri: string) => {
    const user = await githubAuth.token.getToken(uri);

    alert(user.accessToken);

    console.log(user); // => { accessToken: '...', tokenType: 'bearer', ... }

    debugger;

    // // Make a request to the github API for the current user.
    // return popsicle.request(user.sign({ method: 'get', url: 'https://api.github.com/user' })).then(function (res) {
    //     console.log(res) //=> { body: { ... }, status: 200, headers: { ... } }
    // });

};