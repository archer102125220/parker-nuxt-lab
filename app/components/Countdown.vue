<template>
  <!-- https://codepen.io/daniesy/pen/DWVgXN -->
  <div class="countdown" :style="cssVariable">
    <div
      v-if="safeCountDownType === COUNTDOWN_TYPE_DOWN_VALUE"
      class="countdown-down_enter"
    >
      <template v-for="cardNumber in contdownCard" :key="cardNumber">
        <p
          class="countdown-down_enter-down_enter_up"
          :css-is-anime-start="
            isCountdownStart === true && cardNumber >= currentNumber
          "
          :css-is-end-second="cardNumber === endSecond"
          :style="{
            ['--down_enter_up_z_index']: cardNumber
          }"
          @animationend="handleNumberAnimationEnd"
        >
          {{ cardNumber }}
        </p>
        <p
          class="countdown-down_enter-down_enter_down"
          :css-is-initial-seconds="cardNumber === initialSeconds"
          :css-is-anime-start="
            isCountdownStart === true && cardNumber >= currentNumber - 1
          "
          :style="{
            ['--down_enter_down_z_index']: contdownCard.length - cardNumber
          }"
        >
          {{ cardNumber }}
        </p>
      </template>
    </div>

    <div
      v-else-if="safeCountDownType === COUNTDOWN_TYPE_UP_VALUE"
      class="countdown-up_leave"
    >
      <template v-for="cardNumber in contdownCard" :key="cardNumber">
        <p
          class="countdown-up_leave-up_leave_up"
          :css-is-initial-seconds="cardNumber === initialSeconds"
          :css-is-anime-start="
            isCountdownStart === true && cardNumber >= currentNumber - 1
          "
          :css-is-end-second="cardNumber === endSecond"
          :css-card-up_leave_up="cardNumber"
          :style="{
            ['--up_leave_up_z_index']: contdownCard.length - cardNumber
          }"
        >
          {{ cardNumber }}
        </p>
        <p
          class="countdown-up_leave-up_leave_down"
          :css-is-initial-seconds="cardNumber === initialSeconds"
          :css-is-anime-start="
            isCountdownStart === true && cardNumber >= currentNumber
          "
          :css-is-end-second="cardNumber === endSecond"
          :css-card-up_leave_down="cardNumber"
          :style="{
            ['--up_leave_down_z_index']: cardNumber
          }"
          @animationend="handleNumberAnimationEnd"
        >
          {{ cardNumber }}
        </p>
      </template>
    </div>

    <!-- TODO:淡出淡入效果實作 -->
    <!-- <div
      v-else-if="safeCountDownType === COUNTDOWN_TYPE_FADE_VALUE"
      class="countdown-fade_out_in"
    >
      <template v-for="cardNumber in contdownCard" :key="cardNumber">
        <p
          class="countdown-fade_out_in-tick"
          :data-current-number="currentNumber"
          :css-is-initial-seconds="cardNumber === initialSeconds"
          :css-is-anime-start="
            isCountdownStart === true && cardNumber >= currentNumber - 1
          "
          :css-is-end-second="cardNumber === endSecond"
          :css-card-fade="cardNumber"
          :style="{
            ['--tick_delay']: cardNumber >= 1 ? 0 : 2
          }"
          @animationend="handleNumberAnimationEnd"
        >
          {{ cardNumber }}
        </p>
      </template>
    </div> -->

    <!-- <div class="countdown-up_leave">
      <p class="countdown-up_leave-up_leave_up up-59">59</p>
      <p class="countdown-up_leave-up_leave_down down-59">59</p>
      <p class="countdown-up_leave-up_leave_up up-58">58</p>
      <p class="countdown-up_leave-up_leave_down down-58">58</p>
      <p class="countdown-up_leave-up_leave_up up-57">57</p>
      <p class="countdown-up_leave-up_leave_down down-57">57</p>
      <p class="countdown-up_leave-up_leave_up up-56">56</p>
      <p class="countdown-up_leave-up_leave_down down-56">56</p>
      <p class="countdown-up_leave-up_leave_up up-55">55</p>
      <p class="countdown-up_leave-up_leave_down down-55">55</p>
      <p class="countdown-up_leave-up_leave_up up-54">54</p>
      <p class="countdown-up_leave-up_leave_down down-54">54</p>
      <p class="countdown-up_leave-up_leave_up up-53">53</p>
      <p class="countdown-up_leave-up_leave_down down-53">53</p>
      <p class="countdown-up_leave-up_leave_up up-52">52</p>
      <p class="countdown-up_leave-up_leave_down down-52">52</p>
      <p class="countdown-up_leave-up_leave_up up-51">51</p>
      <p class="countdown-up_leave-up_leave_down down-51">51</p>
      <p class="countdown-up_leave-up_leave_up up-50">50</p>
      <p class="countdown-up_leave-up_leave_down down-50">50</p>
      <p class="countdown-up_leave-up_leave_up up-49">49</p>
      <p class="countdown-up_leave-up_leave_down down-49">49</p>
      <p class="countdown-up_leave-up_leave_up up-48">48</p>
      <p class="countdown-up_leave-up_leave_down down-48">48</p>
      <p class="countdown-up_leave-up_leave_up up-47">47</p>
      <p class="countdown-up_leave-up_leave_down down-47">47</p>
      <p class="countdown-up_leave-up_leave_up up-46">46</p>
      <p class="countdown-up_leave-up_leave_down down-46">46</p>
      <p class="countdown-up_leave-up_leave_up up-45">45</p>
      <p class="countdown-up_leave-up_leave_down down-45">45</p>
      <p class="countdown-up_leave-up_leave_up up-44">44</p>
      <p class="countdown-up_leave-up_leave_down down-44">44</p>
      <p class="countdown-up_leave-up_leave_up up-43">43</p>
      <p class="countdown-up_leave-up_leave_down down-43">43</p>
      <p class="countdown-up_leave-up_leave_up up-42">42</p>
      <p class="countdown-up_leave-up_leave_down down-42">42</p>
      <p class="countdown-up_leave-up_leave_up up-41">41</p>
      <p class="countdown-up_leave-up_leave_down down-41">41</p>
      <p class="countdown-up_leave-up_leave_up up-40">40</p>
      <p class="countdown-up_leave-up_leave_down down-40">40</p>
      <p class="countdown-up_leave-up_leave_up up-39">39</p>
      <p class="countdown-up_leave-up_leave_down down-39">39</p>
      <p class="countdown-up_leave-up_leave_up up-38">38</p>
      <p class="countdown-up_leave-up_leave_down down-38">38</p>
      <p class="countdown-up_leave-up_leave_up up-37">37</p>
      <p class="countdown-up_leave-up_leave_down down-37">37</p>
      <p class="countdown-up_leave-up_leave_up up-36">36</p>
      <p class="countdown-up_leave-up_leave_down down-36">36</p>
      <p class="countdown-up_leave-up_leave_up up-35">35</p>
      <p class="countdown-up_leave-up_leave_down down-35">35</p>
      <p class="countdown-up_leave-up_leave_up up-34">34</p>
      <p class="countdown-up_leave-up_leave_down down-34">34</p>
      <p class="countdown-up_leave-up_leave_up up-33">33</p>
      <p class="countdown-up_leave-up_leave_down down-33">33</p>
      <p class="countdown-up_leave-up_leave_up up-32">32</p>
      <p class="countdown-up_leave-up_leave_down down-32">32</p>
      <p class="countdown-up_leave-up_leave_up up-31">31</p>
      <p class="countdown-up_leave-up_leave_down down-31">31</p>
      <p class="countdown-up_leave-up_leave_up up-30">30</p>
      <p class="countdown-up_leave-up_leave_down down-30">30</p>
      <p class="countdown-up_leave-up_leave_up up-29">29</p>
      <p class="countdown-up_leave-up_leave_down down-29">29</p>
      <p class="countdown-up_leave-up_leave_up up-28">28</p>
      <p class="countdown-up_leave-up_leave_down down-28">28</p>
      <p class="countdown-up_leave-up_leave_up up-27">27</p>
      <p class="countdown-up_leave-up_leave_down down-27">27</p>
      <p class="countdown-up_leave-up_leave_up up-26">26</p>
      <p class="countdown-up_leave-up_leave_down down-26">26</p>
      <p class="countdown-up_leave-up_leave_up up-25">25</p>
      <p class="countdown-up_leave-up_leave_down down-25">25</p>
      <p class="countdown-up_leave-up_leave_up up-24">24</p>
      <p class="countdown-up_leave-up_leave_down down-24">24</p>
      <p class="countdown-up_leave-up_leave_up up-23">23</p>
      <p class="countdown-up_leave-up_leave_down down-23">23</p>
      <p class="countdown-up_leave-up_leave_up up-22">22</p>
      <p class="countdown-up_leave-up_leave_down down-22">22</p>
      <p class="countdown-up_leave-up_leave_up up-21">21</p>
      <p class="countdown-up_leave-up_leave_down down-21">21</p>
      <p class="countdown-up_leave-up_leave_up up-20">20</p>
      <p class="countdown-up_leave-up_leave_down down-20">20</p>
      <p class="countdown-up_leave-up_leave_up up-19">19</p>
      <p class="countdown-up_leave-up_leave_down down-19">19</p>
      <p class="countdown-up_leave-up_leave_up up-18">18</p>
      <p class="countdown-up_leave-up_leave_down down-18">18</p>
      <p class="countdown-up_leave-up_leave_up up-17">17</p>
      <p class="countdown-up_leave-up_leave_down down-17">17</p>
      <p class="countdown-up_leave-up_leave_up up-16">16</p>
      <p class="countdown-up_leave-up_leave_down down-16">16</p>
      <p class="countdown-up_leave-up_leave_up up-15">15</p>
      <p class="countdown-up_leave-up_leave_down down-15">15</p>
      <p class="countdown-up_leave-up_leave_up up-14">14</p>
      <p class="countdown-up_leave-up_leave_down down-14">14</p>
      <p class="countdown-up_leave-up_leave_up up-13">13</p>
      <p class="countdown-up_leave-up_leave_down down-13">13</p>
      <p class="countdown-up_leave-up_leave_up up-12">12</p>
      <p class="countdown-up_leave-up_leave_down down-12">12</p>
      <p class="countdown-up_leave-up_leave_up up-11">11</p>
      <p class="countdown-up_leave-up_leave_down down-11">11</p>
      <p class="countdown-up_leave-up_leave_up up-10">10</p>
      <p class="countdown-up_leave-up_leave_down down-10">10</p>
      <p class="countdown-up_leave-up_leave_up up-9">9</p>
      <p class="countdown-up_leave-up_leave_down down-9">9</p>
      <p class="countdown-up_leave-up_leave_up up-8">8</p>
      <p class="countdown-up_leave-up_leave_down down-8">8</p>
      <p class="countdown-up_leave-up_leave_up up-7">7</p>
      <p class="countdown-up_leave-up_leave_down down-7">7</p>
      <p class="countdown-up_leave-up_leave_up up-6">6</p>
      <p class="countdown-up_leave-up_leave_down down-6">6</p>
      <p class="countdown-up_leave-up_leave_up up-5">5</p>
      <p class="countdown-up_leave-up_leave_down down-5">5</p>
      <p class="countdown-up_leave-up_leave_up up-4">4</p>
      <p class="countdown-up_leave-up_leave_down down-4">4</p>
      <p class="countdown-up_leave-up_leave_up up-3">3</p>
      <p class="countdown-up_leave-up_leave_down down-3">3</p>
      <p class="countdown-up_leave-up_leave_up up-2">2</p>
      <p class="countdown-up_leave-up_leave_down down-2">2</p>
      <p class="countdown-up_leave-up_leave_up up-1">1</p>
      <p class="countdown-up_leave-up_leave_down down-1">1</p>
      <p class="countdown-up_leave-up_leave_up up-0">0</p>
      <p class="countdown-up_leave-up_leave_down down-0">0</p>
    </div>
    <div class="countdown-down_enter">
      <p class="up-0 countdown-down_enter-down_enter_up">0</p>
      <p class="countdown-down_enter-down_enter_down down-0">0</p>
      <p class="up-1 countdown-down_enter-down_enter_up">1</p>
      <p class="countdown-down_enter-down_enter_down down-1">1</p>
      <p class="up-2 countdown-down_enter-down_enter_up">2</p>
      <p class="countdown-down_enter-down_enter_down down-2">2</p>
      <p class="up-3 countdown-down_enter-down_enter_up">3</p>
      <p class="countdown-down_enter-down_enter_down down-3">3</p>
      <p class="up-4 countdown-down_enter-down_enter_up">4</p>
      <p class="countdown-down_enter-down_enter_down down-4">4</p>
      <p class="up-5 countdown-down_enter-down_enter_up">5</p>
      <p class="countdown-down_enter-down_enter_down down-5">5</p>
      <p class="up-6 countdown-down_enter-down_enter_up">6</p>
      <p class="countdown-down_enter-down_enter_down down-6">6</p>
      <p class="up-7 countdown-down_enter-down_enter_up">7</p>
      <p class="countdown-down_enter-down_enter_down down-7">7</p>
      <p class="up-8 countdown-down_enter-down_enter_up">8</p>
      <p class="countdown-down_enter-down_enter_down down-8">8</p>
      <p class="up-9 countdown-down_enter-down_enter_up">9</p>
      <p class="countdown-down_enter-down_enter_down down-9">9</p>
      <p class="up-10 countdown-down_enter-down_enter_up">10</p>
      <p class="countdown-down_enter-down_enter_down down-10">10</p>
      <p class="up-11 countdown-down_enter-down_enter_up">11</p>
      <p class="countdown-down_enter-down_enter_down down-11">11</p>
      <p class="up-12 countdown-down_enter-down_enter_up">12</p>
      <p class="countdown-down_enter-down_enter_down down-12">12</p>
      <p class="up-13 countdown-down_enter-down_enter_up">13</p>
      <p class="countdown-down_enter-down_enter_down down-13">13</p>
      <p class="up-14 countdown-down_enter-down_enter_up">14</p>
      <p class="countdown-down_enter-down_enter_down down-14">14</p>
      <p class="up-15 countdown-down_enter-down_enter_up">15</p>
      <p class="countdown-down_enter-down_enter_down down-15">15</p>
      <p class="up-16 countdown-down_enter-down_enter_up">16</p>
      <p class="countdown-down_enter-down_enter_down down-16">16</p>
      <p class="up-17 countdown-down_enter-down_enter_up">17</p>
      <p class="countdown-down_enter-down_enter_down down-17">17</p>
      <p class="up-18 countdown-down_enter-down_enter_up">18</p>
      <p class="countdown-down_enter-down_enter_down down-18">18</p>
      <p class="up-19 countdown-down_enter-down_enter_up">19</p>
      <p class="countdown-down_enter-down_enter_down down-19">19</p>
      <p class="up-20 countdown-down_enter-down_enter_up">20</p>
      <p class="countdown-down_enter-down_enter_down down-20">20</p>
      <p class="up-21 countdown-down_enter-down_enter_up">21</p>
      <p class="countdown-down_enter-down_enter_down down-21">21</p>
      <p class="up-22 countdown-down_enter-down_enter_up">22</p>
      <p class="countdown-down_enter-down_enter_down down-22">22</p>
      <p class="up-23 countdown-down_enter-down_enter_up">23</p>
      <p class="countdown-down_enter-down_enter_down down-23">23</p>
      <p class="up-24 countdown-down_enter-down_enter_up">24</p>
      <p class="countdown-down_enter-down_enter_down down-24">24</p>
      <p class="up-25 countdown-down_enter-down_enter_up">25</p>
      <p class="countdown-down_enter-down_enter_down down-25">25</p>
      <p class="up-26 countdown-down_enter-down_enter_up">26</p>
      <p class="countdown-down_enter-down_enter_down down-26">26</p>
      <p class="up-27 countdown-down_enter-down_enter_up">27</p>
      <p class="countdown-down_enter-down_enter_down down-27">27</p>
      <p class="up-28 countdown-down_enter-down_enter_up">28</p>
      <p class="countdown-down_enter-down_enter_down down-28">28</p>
      <p class="up-29 countdown-down_enter-down_enter_up">29</p>
      <p class="countdown-down_enter-down_enter_down down-29">29</p>
      <p class="up-30 countdown-down_enter-down_enter_up">30</p>
      <p class="countdown-down_enter-down_enter_down down-30">30</p>
      <p class="up-31 countdown-down_enter-down_enter_up">31</p>
      <p class="countdown-down_enter-down_enter_down down-31">31</p>
      <p class="up-32 countdown-down_enter-down_enter_up">32</p>
      <p class="countdown-down_enter-down_enter_down down-32">32</p>
      <p class="up-33 countdown-down_enter-down_enter_up">33</p>
      <p class="countdown-down_enter-down_enter_down down-33">33</p>
      <p class="up-34 countdown-down_enter-down_enter_up">34</p>
      <p class="countdown-down_enter-down_enter_down down-34">34</p>
      <p class="up-35 countdown-down_enter-down_enter_up">35</p>
      <p class="countdown-down_enter-down_enter_down down-35">35</p>
      <p class="up-36 countdown-down_enter-down_enter_up">36</p>
      <p class="countdown-down_enter-down_enter_down down-36">36</p>
      <p class="up-37 countdown-down_enter-down_enter_up">37</p>
      <p class="countdown-down_enter-down_enter_down down-37">37</p>
      <p class="up-38 countdown-down_enter-down_enter_up">38</p>
      <p class="countdown-down_enter-down_enter_down down-38">38</p>
      <p class="up-39 countdown-down_enter-down_enter_up">39</p>
      <p class="countdown-down_enter-down_enter_down down-39">39</p>
      <p class="up-40 countdown-down_enter-down_enter_up">40</p>
      <p class="countdown-down_enter-down_enter_down down-40">40</p>
      <p class="up-41 countdown-down_enter-down_enter_up">41</p>
      <p class="countdown-down_enter-down_enter_down down-41">41</p>
      <p class="up-42 countdown-down_enter-down_enter_up">42</p>
      <p class="countdown-down_enter-down_enter_down down-42">42</p>
      <p class="up-43 countdown-down_enter-down_enter_up">43</p>
      <p class="countdown-down_enter-down_enter_down down-43">43</p>
      <p class="up-44 countdown-down_enter-down_enter_up">44</p>
      <p class="countdown-down_enter-down_enter_down down-44">44</p>
      <p class="up-45 countdown-down_enter-down_enter_up">45</p>
      <p class="countdown-down_enter-down_enter_down down-45">45</p>
      <p class="up-46 countdown-down_enter-down_enter_up">46</p>
      <p class="countdown-down_enter-down_enter_down down-46">46</p>
      <p class="up-47 countdown-down_enter-down_enter_up">47</p>
      <p class="countdown-down_enter-down_enter_down down-47">47</p>
      <p class="up-48 countdown-down_enter-down_enter_up">48</p>
      <p class="countdown-down_enter-down_enter_down down-48">48</p>
      <p class="up-49 countdown-down_enter-down_enter_up">49</p>
      <p class="countdown-down_enter-down_enter_down down-49">49</p>
      <p class="up-50 countdown-down_enter-down_enter_up">50</p>
      <p class="countdown-down_enter-down_enter_down down-50">50</p>
      <p class="up-51 countdown-down_enter-down_enter_up">51</p>
      <p class="countdown-down_enter-down_enter_down down-51">51</p>
      <p class="up-52 countdown-down_enter-down_enter_up">52</p>
      <p class="countdown-down_enter-down_enter_down down-52">52</p>
      <p class="up-53 countdown-down_enter-down_enter_up">53</p>
      <p class="countdown-down_enter-down_enter_down down-53">53</p>
      <p class="up-54 countdown-down_enter-down_enter_up">54</p>
      <p class="countdown-down_enter-down_enter_down down-54">54</p>
      <p class="up-55 countdown-down_enter-down_enter_up">55</p>
      <p class="countdown-down_enter-down_enter_down down-55">55</p>
      <p class="up-56 countdown-down_enter-down_enter_up">56</p>
      <p class="countdown-down_enter-down_enter_down down-56">56</p>
      <p class="up-57 countdown-down_enter-down_enter_up">57</p>
      <p class="countdown-down_enter-down_enter_down down-57">57</p>
      <p class="up-58 countdown-down_enter-down_enter_up">58</p>
      <p class="countdown-down_enter-down_enter_down down-58">58</p>
      <p class="up-59 countdown-down_enter-down_enter_up">59</p>
      <p class="countdown-down_enter-down_enter_down down-59">59</p>
    </div>
    <div class="countdown-fade_out_in">
      <p class="countdown-fade_out_in-tick tick-0">0</p>
      <p class="countdown-fade_out_in-tick tick-1">1</p>
      <p class="countdown-fade_out_in-tick tick-2">2</p>
      <p class="countdown-fade_out_in-tick tick-3">3</p>
      <p class="countdown-fade_out_in-tick tick-4">4</p>
      <p class="countdown-fade_out_in-tick tick-5">5</p>
      <p class="countdown-fade_out_in-tick tick-6">6</p>
      <p class="countdown-fade_out_in-tick tick-7">7</p>
      <p class="countdown-fade_out_in-tick tick-8">8</p>
      <p class="countdown-fade_out_in-tick tick-9">9</p>
      <p class="countdown-fade_out_in-tick tick-10">10</p>
      <p class="countdown-fade_out_in-tick tick-11">11</p>
      <p class="countdown-fade_out_in-tick tick-12">12</p>
      <p class="countdown-fade_out_in-tick tick-13">13</p>
      <p class="countdown-fade_out_in-tick tick-14">14</p>
      <p class="countdown-fade_out_in-tick tick-15">15</p>
      <p class="countdown-fade_out_in-tick tick-16">16</p>
      <p class="countdown-fade_out_in-tick tick-17">17</p>
      <p class="countdown-fade_out_in-tick tick-18">18</p>
      <p class="countdown-fade_out_in-tick tick-19">19</p>
      <p class="countdown-fade_out_in-tick tick-20">20</p>
      <p class="countdown-fade_out_in-tick tick-21">21</p>
      <p class="countdown-fade_out_in-tick tick-22">22</p>
      <p class="countdown-fade_out_in-tick tick-23">23</p>
      <p class="countdown-fade_out_in-tick tick-24">24</p>
      <p class="countdown-fade_out_in-tick tick-25">25</p>
      <p class="countdown-fade_out_in-tick tick-26">26</p>
      <p class="countdown-fade_out_in-tick tick-27">27</p>
      <p class="countdown-fade_out_in-tick tick-28">28</p>
      <p class="countdown-fade_out_in-tick tick-29">29</p>
      <p class="countdown-fade_out_in-tick tick-30">30</p>
      <p class="countdown-fade_out_in-tick tick-31">31</p>
      <p class="countdown-fade_out_in-tick tick-32">32</p>
      <p class="countdown-fade_out_in-tick tick-33">33</p>
      <p class="countdown-fade_out_in-tick tick-34">34</p>
      <p class="countdown-fade_out_in-tick tick-35">35</p>
      <p class="countdown-fade_out_in-tick tick-36">36</p>
      <p class="countdown-fade_out_in-tick tick-37">37</p>
      <p class="countdown-fade_out_in-tick tick-38">38</p>
      <p class="countdown-fade_out_in-tick tick-39">39</p>
      <p class="countdown-fade_out_in-tick tick-40">40</p>
      <p class="countdown-fade_out_in-tick tick-41">41</p>
      <p class="countdown-fade_out_in-tick tick-42">42</p>
      <p class="countdown-fade_out_in-tick tick-43">43</p>
      <p class="countdown-fade_out_in-tick tick-44">44</p>
      <p class="countdown-fade_out_in-tick tick-45">45</p>
      <p class="countdown-fade_out_in-tick tick-46">46</p>
      <p class="countdown-fade_out_in-tick tick-47">47</p>
      <p class="countdown-fade_out_in-tick tick-48">48</p>
      <p class="countdown-fade_out_in-tick tick-49">49</p>
      <p class="countdown-fade_out_in-tick tick-50">50</p>
      <p class="countdown-fade_out_in-tick tick-51">51</p>
      <p class="countdown-fade_out_in-tick tick-52">52</p>
      <p class="countdown-fade_out_in-tick tick-53">53</p>
      <p class="countdown-fade_out_in-tick tick-54">54</p>
      <p class="countdown-fade_out_in-tick tick-55">55</p>
      <p class="countdown-fade_out_in-tick tick-56">56</p>
      <p class="countdown-fade_out_in-tick tick-57">57</p>
      <p class="countdown-fade_out_in-tick tick-58">58</p>
      <p class="countdown-fade_out_in-tick tick-59">59</p>
    </div> -->
  </div>
</template>

<script setup>
const COUNTDOWN_TYPE_DOWN_VALUE = 'down';
const COUNTDOWN_TYPE_UP_VALUE = 'up';
// const COUNTDOWN_TYPE_FADE_VALUE = 'fade'; // TODO:淡出淡入效果實作
const COUNTDOWN_TYPE_LIST = [
  COUNTDOWN_TYPE_DOWN_VALUE,
  COUNTDOWN_TYPE_UP_VALUE
  // COUNTDOWN_TYPE_FADE_VALUE
];

const props = defineProps({
  countdownType: {
    type: String,
    default: COUNTDOWN_TYPE_DOWN_VALUE
  },
  initialSeconds: {
    type: Number,
    default: 20
  },
  endSecond: {
    type: Number,
    default: 0
  },
  autoStart: {
    type: Boolean,
    default: true
  },
  width: {
    type: [Number, String],
    default: null
  },
  height: {
    type: [Number, String],
    default: null
  },
  padding: {
    type: [Number, String],
    default: null
  },
  bgColor: {
    type: String,
    default: '#fff'
  }
});

const currentNumber = ref(null);
const isCountdownStart = ref(false);

const cssVariable = computed(() => {
  const safeCssVariable = {};

  if (typeof props.width === 'string' && props.width !== '') {
    safeCssVariable['--countdown_width'] = props.width;
  } else if (typeof props.width === 'string' && isNaN(props.width) === false) {
    safeCssVariable['--countdown_number'] = `${props.width}px`;
  }

  if (typeof props.height === 'string' && props.height !== '') {
    safeCssVariable['--countdown_height'] = props.height;
  } else if (
    typeof props.height === 'string' &&
    isNaN(props.height) === false
  ) {
    safeCssVariable['--countdown_number'] = `${props.height}px`;
  }

  if (typeof props.padding === 'string' && props.padding !== '') {
    safeCssVariable['--countdown_padding'] = props.padding;
  } else if (
    typeof props.padding === 'string' &&
    isNaN(props.padding) === false
  ) {
    safeCssVariable['--countdown_padding'] = `${props.padding}px`;
  }

  if (typeof props.bgColor === 'string' && props.bgColor !== '') {
    safeCssVariable['--countdown_bg_color'] = props.bgColor;
  }

  return safeCssVariable;
});
const safeCountDownType = computed(() => {
  if (
    typeof props.countdownType !== 'string' ||
    props.countdownType === '' ||
    COUNTDOWN_TYPE_LIST.includes(props.countdownType) === false
  ) {
    return COUNTDOWN_TYPE_LIST[0];
  }
  return props.countdownType;
});
const contdownCard = computed(() => {
  const safeInitialSeconds =
    typeof props.initialSeconds !== 'number' ? 0 : props.initialSeconds;
  const safeEndSecond =
    typeof props.endSecond !== 'number' ? 0 : props.endSecond;

  const contdownCardList = [];

  // 由大至小的數數
  if (safeInitialSeconds > safeEndSecond) {
    for (let start = 0; start <= safeInitialSeconds; start++) {
      contdownCardList.push(start);
    }
  }
  // TODO:由小至大的數數
  // else if (safeInitialSeconds < safeEndSecond) {
  //   for (let start = safeInitialSeconds; start <= safeEndSecond; start++) {
  //     contdownCardList.push(start);
  //   }
  // }

  return contdownCardList;
});

watch(
  () => [props.autoStart, props.initialSeconds, props.endSecond],
  async ([newAutoStart, newInitialSeconds, newEndSecond]) => {
    if (
      newAutoStart === true &&
      typeof newInitialSeconds === 'number' &&
      Math.abs(newInitialSeconds - newEndSecond) > 0
    ) {
      isCountdownStart.value = false;
      currentNumber.value = newInitialSeconds;

      await nextTick();
      window.requestAnimationFrame(() => (isCountdownStart.value = true));
    }
  }
);

onMounted(async () => {
  if (
    props.autoStart === true &&
    typeof props.initialSeconds === 'number' &&
    Math.abs(props.initialSeconds - props.endSecond) > 0
  ) {
    currentNumber.value = props.initialSeconds;
    await nextTick();
    window.requestAnimationFrame(() => (isCountdownStart.value = true));
  }
});

async function handleNumberAnimationEnd(e) {
  console.log(e?.target);

  await nextTick();

  window.requestAnimationFrame(() => {
    if (currentNumber.value === 0) {
      isCountdownStart.value = false;
      // 由大至小的數數
    } else if (props.initialSeconds > props.endSecond) {
      currentNumber.value = currentNumber.value - 1;
      // TODO:由小至大的數數
    } else if (props.initialSeconds < props.endSecond) {
      currentNumber.value = currentNumber.value + 1;
    }
  });
}
</script>

<style lang="scss" scoped>
$countdownUpLeaveWidth: 250px;
$countdownUpLeaveHeight: 175px;
$countdownUpLeavePadding: 20px;
$countdownUpLeaveTotal: 59;

$countdownDownEnterWidth: 200px;
$countdownDownEnterHeight: 100px;
$countdownDownEnterPadding: 10px;
$countdownDownEnterTotal: 59;

// $countdownFadeWidth: 100px;
// $countdownFadeHeight: 50px;
// $countdownFadePadding: 5px;
// $countdownFadeTotal: 59;

* {
  box-sizing: border-box;
}
.conutdow_block {
  display: inline-block;
  margin: 40px 50px;

  vertical-align: top;

  // box-shadow:
  //   4px 4px 0 4px #fff,
  //   8px 8px 0 8px #c0392b;
}
.number {
  position: absolute;
  left: 0;
  right: 0;

  color: #e74c3c;
  text-align: center;

  overflow: hidden;
  backface-visibility: hidden;
}
.number_up {
  top: 0;
  bottom: 50%;

  transform-origin: 50% 100%;
  // background: linear-gradient(to bottom, #000000 0%, #111 100%); /* W3C */
  background-color: var(--countdown_bg_color);
}
.number_down {
  top: 50%;
  bottom: 0;

  line-height: 0px;
  transform-origin: 50% 0%;

  // background: black;
  background-color: var(--countdown_bg_color);
}
.debug_log {
  position: relative;

  z-index: 999999;
  color: #36a300;
}

.countdown {
  --countdown_up_leave_width: #{$countdownUpLeaveWidth};
  --countdown_up_leave_height: #{$countdownUpLeaveHeight};
  --countdown_up_leave_padding: #{$countdownUpLeavePadding};
  --countdown_up_leave_total: #{$countdownUpLeaveTotal};

  --countdown_down_enter_width: #{$countdownDownEnterWidth};
  --countdown_down_enter_height: #{$countdownDownEnterHeight};
  --countdown_down_enter_padding: #{$countdownDownEnterPadding};
  --countdown_down_enter_total: #{$countdownDownEnterTotal};

  // --countdown_fade_width: #{$countdownFadeWidth};
  // --countdown_fade_height: #{$countdownFadeHeight};
  // --countdown_fade_padding: #{$countdownFadePadding};
  // --countdown_fade_total: #{$countdownFadeTotal};

  &-down_enter {
    @extend .conutdow_block;
    position: relative;

    width: var(--countdown_width, var(--countdown_down_enter_width));
    height: var(--countdown_height, var(--countdown_down_enter_height));
    padding: var(--countdown_padding, var(--countdown_down_enter_padding));
    // width: $countdownDownEnterWidth;
    // height: $countdownDownEnterHeight;
    // padding: $countdownDownEnterPadding;

    // background: black;
    background-color: var(--countdown_bg_color);

    perspective: 1000px;

    &-debug_log {
      @extend .debug_log;
    }

    &-down_enter_up {
      @extend .number;
      @extend .number_up;

      z-index: var(--down_enter_up_z_index);

      font-size: calc(
        var(--countdown_down_enter_height) - var(--countdown_down_enter_padding)
      );
      // font-size: $countdownDownEnterHeight - $countdownDownEnterPadding;

      line-height: var(--countdown_down_enter_height);
      // line-height: $countdownDownEnterHeight;

      &[css-is-anime-start='true']:not([css-is-end-second='true']) {
        animation: flip-up 1s 1;
        animation-fill-mode: forwards;
      }
    }

    $i: $countdownDownEnterTotal;
    @while $i > 0 {
      .up-#{$i} {
        animation: flip-up 1s 1;
        animation-delay: #{$countdownDownEnterTotal - $i}s;
        animation-fill-mode: forwards;
        z-index: $i;
      }
      $i: $i - 1;
    }

    &-down_enter_down {
      @extend .number;
      @extend .number_down;

      z-index: var(--down_enter_down_z_index);

      font-size: calc(
        var(--countdown_down_enter_height) - var(--countdown_down_enter_padding)
      );
      // font-size: $countdownDownEnterHeight - $countdownDownEnterPadding;

      transform: rotate3d(-1, 0, 0, 180deg);
      &[css-is-anime-start='true']:not([css-is-initial-seconds='true']) {
        animation: flip-up-back 1s 1;
        animation-fill-mode: forwards;
      }
      &[css-is-initial-seconds='true'] {
        transform: rotate3d(0, 0, 0, 180deg);
      }
    }

    $i: $countdownDownEnterTotal;
    @while $i >= 0 {
      .down-#{$i} {
        z-index: $countdownDownEnterTotal - $i;
        transform: rotate3d(-1, 0, 0, 180deg);
        animation: flip-up-back 1s 1;
        animation-delay: #{$countdownDownEnterTotal - $i - 1}s;
        animation-fill-mode: forwards;
      }
      $i: $i - 1;
    }
  }

  &-up_leave {
    @extend .conutdow_block;
    position: relative;

    width: var(--countdown_width, var(--countdown_up_leave_width));
    height: var(--countdown_height, var(--countdown_up_leave_height));
    padding: var(--countdown_padding, var(--countdown_up_leave_padding));
    // width: $countdownUpLeaveWidth;
    // height: $countdownUpLeaveHeight;
    // padding: $countdownUpLeavePadding;

    perspective: 1000px;

    // background: black;
    background-color: var(--countdown_bg_color);

    &-debug_log {
      @extend .debug_log;
    }

    &-up_leave_up {
      @extend .number;
      @extend .number_up;

      z-index: var(--up_leave_up_z_index);

      font-size: calc(
        var(--countdown_up_leave_height) - var(--countdown_up_leave_padding)
      );
      // font-size: $countdownUpLeaveHeight - $countdownUpLeavePadding;
      line-height: var(--countdown_up_leave_height);
      // line-height: $countdownUpLeaveHeight;

      transform: rotate3d(-1, 0, 0, 180deg);
      &[css-is-anime-start='true']:not([css-is-initial-seconds='true']) {
        animation: flip-up-back 1s 1;
        animation-fill-mode: forwards;
      }
      &[css-is-initial-seconds='true'] {
        transform: rotate3d(0, 0, 0, 180deg);
      }
    }

    @for $i from 1 through $countdownUpLeaveTotal {
      .up-#{$i} {
        z-index: $i;

        transform: rotate3d(-1, 0, 0, 180deg);
        animation: flip-up-back 1s 1;
        animation-delay: #{$i}s;
        animation-fill-mode: forwards;
      }
    }

    &-up_leave_down {
      @extend .number;
      @extend .number_down;

      z-index: var(--up_leave_down_z_index);

      font-size: calc(
        var(--countdown_up_leave_height) - var(--countdown_up_leave_padding)
      );
      // font-size: $countdownUpLeaveHeight - $countdownUpLeavePadding;

      &[css-is-anime-start='true']:not([css-is-end-second='true']) {
        animation: flip-up 1s 1;
        animation-fill-mode: forwards;
      }
    }

    @for $i from 0 through $countdownUpLeaveTotal - 1 {
      .down-#{$i} {
        z-index: 100-$i;

        animation: flip-up 1s 1;
        animation-delay: #{$i + 1}s;
        animation-fill-mode: forwards;
      }
    }
  }

  // &-fade_out_in {
  //   @extend .conutdow_block;
  //   position: relative;

  //   width: var(--countdown_width, var(--countdown_fade_width));
  //   height: var(--countdown_height, var(--countdown_fade_height));
  //   padding: var(--countdown_padding, var(--countdown_fade_padding));
  //   // width: $countdownFadeWidth;
  //   // height: $countdownFadeHeight;
  //   // padding: $countdownFadePadding;

  //    // background: black;
  //    background-color: var(--countdown_bg_color);

  //   &-tick {
  //     position: absolute;
  //     top: 0;
  //     bottom: 0;
  //     left: 0;
  //     right: 0;

  //     color: #e74c3c;
  //     font-size: var(--countdown_height, var(--countdown_fade_height));
  //     // font-size: $countdownFadeHeight;
  //     text-align: center;
  //     line-height: calc(
  //       var(--countdown_height, var(--countdown_fade_height)) - var(
  //           --countdown_padding,
  //           var(--countdown_fade_padding)
  //         ) /
  //         2
  //     );
  //     // line-height: calc($countdownFadeHeight - $countdownFadePadding / 2);

  //     // opacity: 0;

  //    // background: black;
  //    background-color: var(--countdown_bg_color);

  //     &[css-is-anime-start='true'] {
  //       animation: fade 2s 1;
  //       animation-fill-mode: forwards;

  //       animation-delay: var(--tick_delay);
  //     }
  //   }

  //   $i: $countdownDownEnterTotal;
  //   @while $i >= 0 {
  //     .tick-#{$i} {
  //       animation: fade 2s 1;
  //       animation-delay: #{$countdownDownEnterTotal - $i - 1}s;
  //       animation-fill-mode: forwards;
  //     }
  //     $i: $i - 1;
  //   }
  // }
}

@-webkit-keyframes flip-up /* Safari and Chrome */ {
  from {
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    transform: rotate3d(1, 0, 0, 180deg);
  }
}

@-webkit-keyframes flip-up-back /* Safari and Chrome */ {
  from {
    transform: rotate3d(-1, 0, 0, 180deg);
  }
  to {
    transform: rotate3d(0, 0, 0, 0deg);
  }
}

@keyframes flip-up {
  from {
    transform: rotate3d(0, 0, 0, 0deg);
  }
  to {
    transform: rotate3d(1, 0, 0, 180deg);
  }
}

@keyframes flip-up-back {
  from {
    transform: rotate3d(-1, 0, 0, 180deg);
  }
  to {
    transform: rotate3d(0, 0, 0, 0deg);
  }
}

@-webkit-keyframes fade /* Safari and Chrome */ {
  0% {
    opacity: 0;
    -webkit-filter: blur(2px);
  }
  25% {
    opacity: 1;
    -webkit-filter: blur(0px);
  }
  75% {
    opacity: 1;
    -webkit-filter: blur(0px);
  }
  100% {
    opacity: 0;
    -webkit-filter: blur(2px);
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
