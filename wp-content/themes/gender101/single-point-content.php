<section id= "p<?php the_ID(); ?>" class ='point selected'>
    <div class='pointBox standardWidth bracket-box' id='point_<?php the_ID(); ?>'>
        <a class ="sibNav leftArrow" href=""><i class="icon-angle-left"></i></a>
        <a class ="sibNav rightArrow" href=""><i class="icon-angle-right"></i></a>
        <article><?php the_content(); ?></article>
<?php if(have_rows('options')) {?>
        <hr />
        <ul class="optionSet">
            <?php while(have_rows('options')) : the_row(); ?>
            <li opt-id="<?php echo get_row_index(); ?>">
                <a href = "#p<?php the_sub_field('destination'); ?>" class="jumpTrigger" opt-id="<?php echo get_row_index(); ?>" ><?php the_sub_field('text'); ?></a>
                <? /*<%= link_to '',
                fetch_point_path(:pt_id => option.destination),
                :remote => true, :class =>"optionLink" %> */ ?>
            </li>

            <?php endwhile; ?>
        </ul>
        <?php } ?>
        <div class="point-links">
            <a href="<?php echo get_permalink(); ?>" title="permalink">x</a>
        </div>
    </div>
 <!--<hr class="rainbow"/>-->
    <div class="children">
        <div class="holder"></div>
    </div>

</section>