import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then(m => m.SplashScreenPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    loadChildren: () => import('./log-in/log-in.module').then(m => m.LogInPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
  },

  {
    path: 'digitalsignature',
    loadChildren: () => import('./digitalsignature/digitalsignature.module').then(m => m.DigitalsignaturePageModule)
  },
  {
    path: 'admin',
    children: [
      {
        path: ':workspace/menu', // Dynamic segment for workspace name
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
      },
      // Other child routes for 'admin' if needed
    ]
  },

  // { path: "**", component: LoginComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
