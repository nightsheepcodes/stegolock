<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SurveyQuestion;
use Illuminate\Support\Facades\DB;

class SurveySeeder extends Seeder
{
    public function run(): void
    {
        // Truncate to ensure we only have the correct set
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        SurveyQuestion::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $questions = [
            // FUNCTIONAL SUSTAINABILITY (FS)
            ['category' => 'Functional Sustainability', 'code' => 'FS1', 'text' => "I consider the information and data available in the StegoLock web app to be adequate.", 'order' => 1],
            ['category' => 'Functional Sustainability', 'code' => 'FS2', 'text' => "I feel that the StegoLock web app navigation buttons work well.", 'order' => 2],
            ['category' => 'Functional Sustainability', 'code' => 'FS3', 'text' => "I feel that overall, the StegoLock web app button functions work well.", 'order' => 3],
            ['category' => 'Functional Sustainability', 'code' => 'FS4', 'text' => "I feel that the information and data available in the StegoLock web app are comprehensive.", 'order' => 4],
            ['category' => 'Functional Sustainability', 'code' => 'FS5', 'text' => "The StegoLock web app is very useful.", 'order' => 5],

            // RELIABILITY (RE)
            ['category' => 'Reliability', 'code' => 'RE1', 'text' => "I feel that the StegoLock web app can be used at any time.", 'order' => 6],
            ['category' => 'Reliability', 'code' => 'RE2', 'text' => "I have never experienced any StegoLock web app crash, lag, or failure while using it.", 'order' => 7],
            ['category' => 'Reliability', 'code' => 'RE3', 'text' => "I find that the StegoLock web app can be easily used on any PC and mobile devices.", 'order' => 8],
            ['category' => 'Reliability', 'code' => 'RE4', 'text' => "I think that the StegoLock web app has a good level of reliability and application performance when using various internet connections (e.g. WiFi, 4G, 3G).", 'order' => 9],
            ['category' => 'Reliability', 'code' => 'RE5', 'text' => "I think if an error occurs in the StegoLock web app, the app can work normally as usual.", 'order' => 10],
            ['category' => 'Reliability', 'code' => 'RE6', 'text' => "Overall, I find the StegoLock web app to be always reliable.", 'order' => 11],

            // SECURITY (SC)
            ['category' => 'Security', 'code' => 'SC1', 'text' => "I think the StegoLock web app provides good control and data security.", 'order' => 12],
            ['category' => 'Security', 'code' => 'SC2', 'text' => "I think StegoLock is a trustworthy application.", 'order' => 13],
            ['category' => 'Security', 'code' => 'SC3', 'text' => "I believe that the StegoLock web app ensures that only authorized users can view, update, and upload.", 'order' => 14],
            ['category' => 'Security', 'code' => 'SC4', 'text' => "I believe that the StegoLock web app has a strong authentication mechanism to ensure that only authorized users can access the application.", 'order' => 15],
            ['category' => 'Security', 'code' => 'SC5', 'text' => "I believe that the StegoLock web app only provides access to authorized users.", 'order' => 16],

            // PERFORMANCE EFFICIENCY (PE)
            ['category' => 'Performance Efficiency', 'code' => 'PE1', 'text' => "I feel that the StegoLock web app is responsive when displaying information.", 'order' => 17],
            ['category' => 'Performance Efficiency', 'code' => 'PE2', 'text' => "I feel that the StegoLock web app responds quickly when updating user information.", 'order' => 18],
            ['category' => 'Performance Efficiency', 'code' => 'PE3', 'text' => "I don't seem to notice any delays when accessing information or updating data in the StegoLock web app (e.g., long loading indicator, failure to navigate through pages).", 'order' => 19],
            ['category' => 'Performance Efficiency', 'code' => 'PE4', 'text' => "I think that StegoLock responds well when I click on the buttons and it doesn't take much time.", 'order' => 20],
            ['category' => 'Performance Efficiency', 'code' => 'PE5', 'text' => "I think the StegoLock web app is responsive in providing results and reactions to user actions.", 'order' => 21],
            ['category' => 'Performance Efficiency', 'code' => 'PE6', 'text' => "I have never experienced performance issues related to the StegoLock web app (e.g., slow response, auto-close app, etc.).", 'order' => 22],
            ['category' => 'Performance Efficiency', 'code' => 'PE7', 'text' => "I believe that the StegoLock web app is compatible with my device.", 'order' => 23],

            // USABILITY (US)
            ['category' => 'Usability', 'code' => 'US1', 'text' => "I think the way to use the StegoLock web app is easy to remember.", 'order' => 24],
            ['category' => 'Usability', 'code' => 'US2', 'text' => "I find the StegoLock web app easy to use.", 'order' => 25],
            ['category' => 'Usability', 'code' => 'US3', 'text' => "I seem to quickly understand when there are additional features in the StegoLock web app.", 'order' => 26],
            ['category' => 'Usability', 'code' => 'US4', 'text' => "I think the StegoLock web app makes updated data easier.", 'order' => 27],
            ['category' => 'Usability', 'code' => 'US5', 'text' => "StegoLock web app has an attractive appearance, well organized and without excess (user Friendly).", 'order' => 28],
            ['category' => 'Usability', 'code' => 'US6', 'text' => "I have never had any difficulty using the features included in the StegoLock web app.", 'order' => 29],
            ['category' => 'Usability', 'code' => 'US7', 'text' => "I think the StegoLock web app is easily accessible.", 'order' => 30],
            ['category' => 'Usability', 'code' => 'US8', 'text' => "I believe that the StegoLock web app is accessible and remains available for use in certain situations or conditions.", 'order' => 31],
            ['category' => 'Usability', 'code' => 'US9', 'text' => "I feel that the StegoLock web app can be used anywhere.", 'order' => 32],
        ];

        foreach ($questions as $question) {
            SurveyQuestion::create($question);
        }
    }
}
