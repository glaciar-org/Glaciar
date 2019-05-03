# Glaciar Open Source


______________________________________________________________________
#ID-2 Front

    ng g m glaciar                           --routing
    ng g m glaciar/front                     --routing
    ng g m glaciar/front/data-dashboard      --routing

    ng g c glaciar                           --spec false

    ng g c glaciar/front/home
    ng g c glaciar/front/data-dashboard 
    ng g c glaciar/front/faq
    ng g c glaciar/front/about


    ╰─$ ng g m glaciar                       --routing
        CREATE src/app/glaciar/glaciar-routing.module.ts
        CREATE src/app/glaciar/glaciar.module.ts

    ╰─$ ng g m glaciar/front                 --routing
        CREATE src/app/glaciar/front/front-routing.module.ts
        CREATE src/app/glaciar/front/front.module.ts

    ╰─$ ng g m glaciar/front/data-dashboard  --routing 
        CREATE src/app/glaciar/front/data-dashboard/data-dashboard-routing.module.ts
        CREATE src/app/glaciar/front/data-dashboard/data-dashboard.module.ts
        
    ╰─$ ng g c glaciar  --spec false
        CREATE src/app/glaciar/glaciar.component.scss
        CREATE src/app/glaciar/glaciar.component.html
        CREATE src/app/glaciar/glaciar.component.ts
        UPDATE src/app/glaciar/glaciar.module.ts

    ╰─$ ng g c glaciar/front/home
        CREATE src/app/glaciar/front/home/home.component.scss
        CREATE src/app/glaciar/front/home/home.component.html
        CREATE src/app/glaciar/front/home/home.component.spec.ts
        CREATE src/app/glaciar/front/home/home.component.ts
        UPDATE src/app/glaciar/front/front.module.ts

    ╰─$ ng g c glaciar/front/faq
        CREATE src/app/glaciar/front/faq/faq.component.scss
        CREATE src/app/glaciar/front/faq/faq.component.html
        CREATE src/app/glaciar/front/faq/faq.component.spec.ts
        CREATE src/app/glaciar/front/faq/faq.component.ts
        UPDATE src/app/glaciar/front/front.module.ts

    ╰─$ ng g c glaciar/front/data-dashboard
        CREATE src/app/glaciar/front/data-dashboard/data-dashboard.component.scss
        CREATE src/app/glaciar/front/data-dashboard/data-dashboard.component.html
        CREATE src/app/glaciar/front/data-dashboard/data-dashboard.component.spec.ts
        CREATE src/app/glaciar/front/data-dashboard/data-dashboard.component.ts
        UPDATE src/app/glaciar/front/data-dashboard/data-dashboard.module.ts

    ╰─$ ng g c glaciar/front/about 
        CREATE src/app/glaciar/front/about/about.component.scss
        CREATE src/app/glaciar/front/about/about.component.html
        CREATE src/app/glaciar/front/about/about.component.spec.ts
        CREATE src/app/glaciar/front/about/about.component.ts
        UPDATE src/app/glaciar/front/front.module.ts

______________________________________________________________________
ID-#01 Prueba navegacion pablo

    ng g c pages/miscellaneous/pablo

    ╰─$ ng g c pages/miscellaneous/pablo 
        CREATE src/app/pages/miscellaneous/pablo/pablo.component.scss
        CREATE src/app/pages/miscellaneous/pablo/pablo.component.html
        CREATE src/app/pages/miscellaneous/pablo/pablo.component.spec.ts
        CREATE src/app/pages/miscellaneous/pablo/pablo.component.ts
        UPDATE src/app/pages/miscellaneous/miscellaneous.module.ts
______________________________________________________________________
ID-#3 Add Services

        ng g service glaciar/services/data
        ng g service glaciar/services/umbral
        ng g service glaciar/services/message
        ng g service glaciar/services/labs
        ng g service glaciar/services/glaciar-storage

        ╰─$ ng g service glaciar/services/data 
            CREATE src/app/glaciar/services/data.service.spec.ts
            CREATE src/app/glaciar/services/data.service.ts

        ╰─$ ng g service glaciar/services/umbral 
            CREATE src/app/glaciar/services/umbral.service.spec.ts
            CREATE src/app/glaciar/services/umbral.service.ts

        ╰─$ ng g service glaciar/services/message
            CREATE src/app/glaciar/services/message.service.spec.ts
            CREATE src/app/glaciar/services/message.service.ts

        ╰─$ ng g service glaciar/services/labs
            CREATE src/app/glaciar/services/labs.service.spec.ts
            CREATE src/app/glaciar/services/labs.service.ts

        ╰─$ ng g service glaciar/services/glaciar-storage 
            CREATE src/app/glaciar/services/glaciar-storage.service.spec.ts
            CREATE src/app/glaciar/services/glaciar-storage.service.ts


______________________________________________________________________
ID-#3 Glaciar Modules

    ng g m glaciar/components                     --routing
    ng g c glaciar/components/util/debug

    ╰─$ ng g m glaciar/components                 --routing 
        CREATE src/app/glaciar/components/components-routing.module.ts
        CREATE src/app/glaciar/components/components.module.ts

    ╰─$ ng g c glaciar/components/util/debug
        CREATE src/app/glaciar/components/util/debug/debug.component.scss
        CREATE src/app/glaciar/components/util/debug/debug.component.html
        CREATE src/app/glaciar/components/util/debug/debug.component.spec.ts
        CREATE src/app/glaciar/components/util/debug/debug.component.ts
        UPDATE src/app/glaciar/components/components.module.ts

    ng g c  glaciar/components/extra/toastr
    ng g s  glaciar/components/extra/toastr/toastr
    ng g service glaciar/components/extra/toastr/toastr

    ╰─$ ng g c  glaciar/components/extra/toastr 
        CREATE src/app/glaciar/components/extra/toastr/toastr.component.scss
        CREATE src/app/glaciar/components/extra/toastr/toastr.component.html
        CREATE src/app/glaciar/components/extra/toastr/toastr.component.spec.ts
        CREATE src/app/glaciar/components/extra/toastr/toastr.component.ts
        UPDATE src/app/glaciar/components/components.module.ts

    ╰─$  ng g s glaciar/components/extra/toastr/toastr
        CREATE src/app/glaciar/components/extra/toastr/toastr.service.spec.ts
        CREATE src/app/glaciar/components/extra/toastr/toastr.service.ts

    ╰─$ ng g c  glaciar/components/extra/datepicker 
        CREATE src/app/glaciar/components/extra/datepicker/datepicker.component.scss
        CREATE src/app/glaciar/components/extra/datepicker/datepicker.component.html
        CREATE src/app/glaciar/components/extra/datepicker/datepicker.component.spec.ts
        CREATE src/app/glaciar/components/extra/datepicker/datepicker.component.ts
        UPDATE src/app/glaciar/components/components.module.ts

______________________________________________________________________
## Glaciar Labs

    ng g m glaciar/front/labs     --routing
    ng g c glaciar/front/labs

    ╰─$ ng g m glaciar/front/labs --routing
        CREATE src/app/glaciar/front/labs/labs-routing.module.ts
        CREATE src/app/glaciar/front/labs/labs.module.ts

    ╰─$ ng g c glaciar/front/labs 
        CREATE src/app/glaciar/front/labs/labs.component.scss
        CREATE src/app/glaciar/front/labs/labs.component.html
        CREATE src/app/glaciar/front/labs/labs.component.spec.ts
        CREATE src/app/glaciar/front/labs/labs.component.ts
        UPDATE src/app/glaciar/front/labs/labs.module.ts

______________________________________________________________________
## Glaciar Config

    ng g m glaciar/front/config  --routing
    ng g c glaciar/front/config

    ng g c glaciar/front/config/info
    ng g c glaciar/front/config/umbral
    ng g c glaciar/front/config/setup
    ng g c glaciar/front/config/outlier
    ng g c glaciar/front/config/config-tab
    ng g c glaciar/front/config/dispersion

    ╰─$ ng g m glaciar/front/config  --routing
        CREATE src/app/glaciar/front/config/config-routing.module.ts
        CREATE src/app/glaciar/front/config/config.module.ts

    ╰─$ ng g c glaciar/front/config 
        CREATE src/app/glaciar/front/config/config.component.scss
        CREATE src/app/glaciar/front/config/config.component.html
        CREATE src/app/glaciar/front/config/config.component.spec.ts
        CREATE src/app/glaciar/front/config/config.component.ts
        UPDATE src/app/glaciar/front/config/config.module.ts

    ╰─$ ng g c glaciar/front/config/info 
        CREATE src/app/glaciar/front/config/info/info.component.scss
        CREATE src/app/glaciar/front/config/info/info.component.html
        CREATE src/app/glaciar/front/config/info/info.component.spec.ts
        CREATE src/app/glaciar/front/config/info/info.component.ts
        UPDATE src/app/glaciar/front/config/config.module.ts

    ╰─$ ng g c glaciar/front/config/umbral
        CREATE src/app/glaciar/front/config/umbral/umbral.component.scss
        CREATE src/app/glaciar/front/config/umbral/umbral.component.html
        CREATE src/app/glaciar/front/config/umbral/umbral.component.spec.ts
        CREATE src/app/glaciar/front/config/umbral/umbral.component.ts
        UPDATE src/app/glaciar/front/config/config.module.ts

    ╰─$ ng g c glaciar/front/config/setup 
        CREATE src/app/glaciar/front/config/setup/setup.component.scss
        CREATE src/app/glaciar/front/config/setup/setup.component.html
        CREATE src/app/glaciar/front/config/setup/setup.component.spec.ts
        CREATE src/app/glaciar/front/config/setup/setup.component.ts
        UPDATE src/app/glaciar/front/config/config.module.ts

    ╰─$ ng g c glaciar/front/config/outlier 
        CREATE src/app/glaciar/front/config/outlier/outlier.component.scss
        CREATE src/app/glaciar/front/config/outlier/outlier.component.html
        CREATE src/app/glaciar/front/config/outlier/outlier.component.spec.ts
        CREATE src/app/glaciar/front/config/outlier/outlier.component.ts
        UPDATE src/app/glaciar/front/config/config.module.ts

    ╰─$ ng g c glaciar/front/config/dispersion 
        CREATE src/app/glaciar/front/config/dispersion/dispersion.component.scss
        CREATE src/app/glaciar/front/config/dispersion/dispersion.component.html
        CREATE src/app/glaciar/front/config/dispersion/dispersion.component.spec.ts
        CREATE src/app/glaciar/front/config/dispersion/dispersion.component.ts
        UPDATE src/app/glaciar/front/config/config.module.ts

    ╰─$ ng g c glaciar/front/config/config-tab 
        CREATE src/app/glaciar/front/config/config-tab/config-tab.component.scss
        CREATE src/app/glaciar/front/config/config-tab/config-tab.component.html
        CREATE src/app/glaciar/front/config/config-tab/config-tab.component.spec.ts
        CREATE src/app/glaciar/front/config/config-tab/config-tab.component.ts
        UPDATE src/app/glaciar/front/config/config.module.ts

______________________________________________________________________
Agrego el 
npm install ngx-ui-switch --save



## ---------------------------------------------------------------------
ID_#62 Outliers - Basado en ng2-nouislider

    SIGO A:
        file:///Users/pabloinchausti/Desktop/DevOps/code/github/PabloEzequiel/UELA-2.0/apex-v5.1/documentation/documentation-components-noui-slider.html

    npm install ng2-nouislider --save
    npm install nouislider --save





______________________________________________________________________


    Install ngx-toastr using npm

    ngx-toastr
    npm install ngx-toastr --save

    In order to use animation, please install below using npm

    @angular/animations
    npm install @angular/animations --save

    "@angular/animations": "^7.2.11",
______________________________________________________________________
Instalo el componeten de módulos chart en Glaciar:

    ng g m glaciar/charts  --routing
    
    ng g c glaciar/charts
    ng g c glaciar/charts/chartjs
    ng g c glaciar/charts/amcharts4

    ╰─$ ng g m glaciar/charts  --routing 
        CREATE src/app/glaciar/charts/charts-routing.module.ts
        CREATE src/app/glaciar/charts/charts.module.ts

    ╰─$ ng g c glaciar/charts/amcharts4
        CREATE src/app/glaciar/charts/amcharts4/amcharts4.component.scss
        CREATE src/app/glaciar/charts/amcharts4/amcharts4.component.html
        CREATE src/app/glaciar/charts/amcharts4/amcharts4.component.spec.ts
        CREATE src/app/glaciar/charts/amcharts4/amcharts4.component.ts
        UPDATE src/app/glaciar/charts/charts.module.ts
    
    ------------------------------------------------

    ng g m glaciar/chartz  --routing
    ng g c glaciar/chartz/amcharts4

    ╰─$ ng g m glaciar/chartz  --routing 
        CREATE src/app/glaciar/chartz/chartz-routing.module.ts
        CREATE src/app/glaciar/chartz/chartz.module.ts

    ╰─$ ng g c glaciar/chartz/amcharts4 
        CREATE src/app/glaciar/chartz/amcharts4/amcharts4.component.scss
        CREATE src/app/glaciar/chartz/amcharts4/amcharts4.component.html
        CREATE src/app/glaciar/chartz/amcharts4/amcharts4.component.spec.ts
        CREATE src/app/glaciar/chartz/amcharts4/amcharts4.component.ts
        UPDATE src/app/glaciar/chartz/chartz.module.ts

<!-- 
    Obsoleto: Borrar:

    ng g m glaciar/charts-lab  --routing
    ng g c glaciar/charts-lab/amch4-la
    ng g c glaciar/charts-lab/amch4-lb

    ╰─$ ng g m glaciar/charts-lab  --routing 
        CREATE src/app/glaciar/charts-lab/charts-lab-routing.module.ts
        CREATE src/app/glaciar/charts-lab/charts-lab.module.ts

    ╰─$ ng g c glaciar/charts-lab/amch4-la 
        CREATE src/app/glaciar/charts-lab/amch4-la/amch4-la.component.scss
        CREATE src/app/glaciar/charts-lab/amch4-la/amch4-la.component.html
        CREATE src/app/glaciar/charts-lab/amch4-la/amch4-la.component.spec.ts
        CREATE src/app/glaciar/charts-lab/amch4-la/amch4-la.component.ts
        UPDATE src/app/glaciar/charts-lab/charts-lab.module.ts

    ╰─$ ng g c glaciar/charts-lab/amch4-lb 
        CREATE src/app/glaciar/charts-lab/amch4-lb/amch4-lb.component.scss
        CREATE src/app/glaciar/charts-lab/amch4-lb/amch4-lb.component.html
        CREATE src/app/glaciar/charts-lab/amch4-lb/amch4-lb.component.spec.ts
        CREATE src/app/glaciar/charts-lab/amch4-lb/amch4-lb.component.ts
        UPDATE src/app/glaciar/charts-lab/charts-lab.module.ts
-->

    --------------
    Again ... renombroa chartz!


        ╰─$ ng g m glaciar/chartz-lab  --routing
            CREATE src/app/glaciar/chartz-lab/chartz-lab-routing.module.ts
            CREATE src/app/glaciar/chartz-lab/chartz-lab.module.ts
            
        ╰─$ ng g c glaciar/chartz-lab/amch4-la                                                  
            CREATE src/app/glaciar/chartz-lab/amch4-la/amch4-la.component.scss
            CREATE src/app/glaciar/chartz-lab/amch4-la/amch4-la.component.html
            CREATE src/app/glaciar/chartz-lab/amch4-la/amch4-la.component.spec.ts
            CREATE src/app/glaciar/chartz-lab/amch4-la/amch4-la.component.ts
            UPDATE src/app/glaciar/chartz-lab/chartz-lab.module.ts
        
        ╰─$ ng g c glaciar/chartz-lab/amch4-lb
            CREATE src/app/glaciar/chartz-lab/amch4-lb/amch4-lb.component.scss
            CREATE src/app/glaciar/chartz-lab/amch4-lb/amch4-lb.component.html
            CREATE src/app/glaciar/chartz-lab/amch4-lb/amch4-lb.component.spec.ts
            CREATE src/app/glaciar/chartz-lab/amch4-lb/amch4-lb.component.ts
            UPDATE src/app/glaciar/chartz-lab/chartz-lab.module.ts


______________________________________________________________________
Agrego el File Saver:

    Tuve que poner una  versión específica, porque la versión 2.x rompe en Angular:

    npm i file-saver@1.3.8 --save



______________________________________________________________________

    glaciar/charts
    glaciar/chart
    glaciar/chart-gcr    ChartGcrModulr
    glaciar/chartg
    glaciar/vchart
    glaciar/chartg
    glaciar/chartz
    glaciar/chartz
    glaciar/gchart
    glaciar/gchart

    ng g m glaciar/gcharts  --routing
    
    ng g c glaciar/gcharts
    ng g c glaciar/gcharts/chartjs
    ng g c glaciar/gcharts/amcharts4


    import {ChartModule} from 'angular2-highcharts';


    ng g m glaciar/chartz-lab  --routing
    ng g c glaciar/chartz-lab/amch4-la
    ng g c glaciar/chartz-lab/amch4-lb






