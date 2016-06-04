<?php get_header(); ?>
<div class="row">
    <div class="rowBuffer">
        <section class="standardWidth" id="introText" role="main">
            <header>
                <h5>Welcome to</h5>
                <h1><span>Gender</span> <span>101</span></h1>
            </header>
            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>> <?php edit_post_link(); ?>
                <?php the_content(); ?>
            </article>
            <?php endwhile; endif; ?>
        </section>
    </div>
</div>

<div class="row">
    <?php
    $post_args = array('post_type' => 'point', 'tag' => 'first');
    $points = get_posts($post_args);
    foreach($points as $post) : setup_postdata( $post );
    ?>
        <?php get_template_part( 'single-point', 'content' ); ?>
    <?php endforeach;
    wp_reset_postdata(); ?>
    <? /*<% if Point.count > 0 %>
    <%= render 'points/single_point'%>
    <% end %> */ ?>
</div>
<?php get_footer(); ?>
<script>
   // $(document).ready(function(){
        /*//populate option tree with options from first point
        optionString = $('<div/>').html('<%= @options %>').text();

        initOpt = JSON.parse(optionString);
        if ($.isEmptyObject(window.optionTree)){
            addChildOptions(initOpt, window.optionTree);
        }*/
    //});
</script>
