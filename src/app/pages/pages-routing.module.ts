import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'bimestre/:idCurso/:idDocente', loadChildren: './bimestre/bimestre.module#BimestreModule' },
            { path: 'estudiante', loadChildren: './estudiante/estudiante.module#EstudianteModule' },
            { path: 'docente', loadChildren: './docente/docente.module#DocenteModule' },
            { path: 'tutor', loadChildren: './tutor/tutor.module#TutorModule' },
            { path: 'reunion', loadChildren: './reunion/reunion.module#ReunionModule' },
            { path: 'curso', loadChildren: './curso/curso.module#CursoModule' },
            { path: 'actividad-civica', loadChildren: './actividad-civica/actividad-civica.module#ActividadCivicaModule' },
            { path: 'plantel-administrativo', loadChildren: './plantel-administrativo/plantel-administrativo.module#PlantelAdministrativoModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
