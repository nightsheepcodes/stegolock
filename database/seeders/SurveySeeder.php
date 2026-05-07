<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SurveyQuestion;

class SurveySeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
            // Performance Efficiency
            ['category' => 'Performance Efficiency', 'code' => 'PE1', 'text' => "I feel that the StegoLock web app is responsive when displaying information.", 'order' => 1],
            ['category' => 'Performance Efficiency', 'code' => 'PE2', 'text' => "I feel that the StegoLock web app responds quickly when updating user information.", 'order' => 2],
            ['category' => 'Performance Efficiency', 'code' => 'PE3', 'text' => "I don't seem to notice any delays when accessing information or updating data in the StegoLock web app.", 'order' => 3],
            ['category' => 'Performance Efficiency', 'code' => 'PE4', 'text' => "I think that StegoLock responds well when I click on the buttons and it doesn't take much time.", 'order' => 4],
            ['category' => 'Performance Efficiency', 'code' => 'PE5', 'text' => "I think the StegoLock web app is responsive in providing results and reactions to user actions.", 'order' => 5],
            ['category' => 'Performance Efficiency', 'code' => 'PE6', 'text' => "I have never experienced performance issues related to the StegoLock web app (e.g., slow response, etc.).", 'order' => 6],
            ['category' => 'Performance Efficiency', 'code' => 'PE7', 'text' => "I believe that the StegoLock web app is compatible with my device.", 'order' => 7],

            // Usability
            ['category' => 'Usability', 'code' => 'US1', 'text' => "I think the way to use the StegoLock web app is easy to remember.", 'order' => 8],
            ['category' => 'Usability', 'code' => 'US2', 'text' => "I find the StegoLock web app easy to use.", 'order' => 9],
            ['category' => 'Usability', 'code' => 'US3', 'text' => "I seem to quickly understand when there are additional features in the StegoLock web app.", 'order' => 10],
            ['category' => 'Usability', 'code' => 'US4', 'text' => "I think the StegoLock web app makes updated data easier.", 'order' => 11],
            ['category' => 'Usability', 'code' => 'US5', 'text' => "I have never had any difficulty using the features included in the StegoLock web app.", 'order' => 12],
            ['category' => 'Usability', 'code' => 'US6', 'text' => "I find the navigation within the StegoLock web app to be intuitive.", 'order' => 13],
            ['category' => 'Usability', 'code' => 'US7', 'text' => "I think the StegoLock web app is easily accessible.", 'order' => 14],
            ['category' => 'Usability', 'code' => 'US8', 'text' => "I believe that the StegoLock web app remains available for use in certain situations or conditions.", 'order' => 15],
            ['category' => 'Usability', 'code' => 'US9', 'text' => "I feel that the StegoLock web app can be used anywhere.", 'order' => 16],

            // Reliability
            ['category' => 'Reliability', 'code' => 'RE1', 'text' => "I feel that the StegoLock web app can be used at any time.", 'order' => 17],
            ['category' => 'Reliability', 'code' => 'RE2', 'text' => "I have never experienced any StegoLock web app crash, lag, or failure while using it.", 'order' => 18],
            ['category' => 'Reliability', 'code' => 'RE3', 'text' => "I find that the StegoLock web app can be easily used on any PC and mobile devices.", 'order' => 19],
            ['category' => 'Reliability', 'code' => 'RE4', 'text' => "I think that the StegoLock web app has a good level of reliability when using various internet connections.", 'order' => 20],
            ['category' => 'Reliability', 'code' => 'RE5', 'text' => "I think if an error occurs in the StegoLock web app, the app can work normally as usual.", 'order' => 21],
            ['category' => 'Reliability', 'code' => 'RE6', 'text' => "Overall, I find the StegoLock web app to be always reliable.", 'order' => 22],

            // Security
            ['category' => 'Security', 'code' => 'SC1', 'text' => "I think the StegoLock web app provides good control and data security.", 'order' => 23],
            ['category' => 'Security', 'code' => 'SC2', 'text' => "I think StegoLock is a trustworthy application.", 'order' => 24],
            ['category' => 'Security', 'code' => 'SC3', 'text' => "I believe that the StegoLock web app ensures that only authorized users can view, update, and upload.", 'order' => 25],
            ['category' => 'Security', 'code' => 'SC4', 'text' => "I believe that the StegoLock web app has a strong authentication mechanism.", 'order' => 26],
            ['category' => 'Security', 'code' => 'SC5', 'text' => "I believe that the StegoLock web app only provides access to authorized users.", 'order' => 27],
        ];

        foreach ($questions as $question) {
            SurveyQuestion::updateOrCreate(['code' => $question['code']], $question);
        }
    }
}
