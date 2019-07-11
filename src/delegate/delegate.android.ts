import * as appModule from "tns-core-modules/application";

import { TnsOAuthClient } from "../index";

export class TnsOAuthClientAppDelegate {
  private static _client: TnsOAuthClient;
  private static _urlScheme: string;

  public static setConfig(client: TnsOAuthClient, urlScheme: string) {
    this._client = client;
    this._urlScheme = urlScheme;
    appModule.android.on(
      appModule.AndroidApplication.activityResumedEvent,
      function(args) {
        if (
          new String(args.activity.getIntent().getAction()).valueOf() ===
          new String(android.content.Intent.ACTION_VIEW).valueOf()
        ) {
          const url = args.activity
            .getIntent()
            .getData()
            .toString();
          TnsOAuthClientAppDelegate._client.resumeWithUrl(url);
          console.log(args.activity.getIntent().getData());
        }
        appModule.android.off(appModule.AndroidApplication.activityResumedEvent);
      }
    );
  }
}
